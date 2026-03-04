<template>
  <div class="bg-[#ffffff] min-h-screen lazy-css">
    <h1 class="text-3xl font-bold mb-8">Admin View</h1>
    <div v-if="loading" class="text-center">Loading...</div>                             <!-- Loading wait screen -->
    <div v-else-if="error" class="text-center text-red-500"> {{ error }}</div>                         <!-- Error message -->
    <div v-else class="flex flex-wrap -mx-2">                                    <!-- add new product section -->
    <div class="my-8 p-2 w-full">
      <h2 class="text-2xl font-semibold mb-4">Add Product</h2>
      <form @submit.prevent="addJewelryHandler">                                                               <!-- Add product form -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" v-model="newJewelry.name" placeholder="Name" class="p-2 border rounded" />  
        <!--   <input type="text" v-model="newJewelry.material" placeholder="Material" class="p-2 border rounded" /> -->


          <select class="p-2 border rounded" v-model="newJewelry.material" required>
          <option disabled value="">Select material</option>
          <option value="gold">gold</option>
          <option value="silver">silver</option>
          <option value="steel">steel</option>
          <option value="other">other</option>
        </select>
          <span  class="absolute text-red-500 text-xs ml-2">Can't be empty</span> <!-- Error message & validate -->

          <input type="text" v-model="newJewelry.description"  placeholder="Description" class="p-2 border rounded" /> <!-- Product description -->
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Price: </span>
            <input type="number" v-model="newJewelry.price"   placeholder="Price" class=" pl-2 " /> <!-- Product price -->
          </div>
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Stock: </span>
            <input type="number" v-model="newJewelry.stock"  placeholder="Stock" class=" pl-2 " />  <!-- Product stock -->
          </div>
          <div class="p-2 border rounded flex items-center">

            <input type="checkbox" v-model="newJewelry.isOnDiscount"  class="border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Discount in %:</span> <!-- Discount in % -->
            <input type="number" v-model="newJewelry.discount"  placeholder="Discount %" class=" ml-2 pl-2 " /> <!-- Discount % -->
          </div>
          <div class="p-2 border rounded flex items-center ">
            <input type="checkbox" v-model="newJewelry.isFeatured"  class="p-2 border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Featured product</span> 
          </div>
          <input type="text" v-model="newJewelry.imageURL"  placeholder="Image URL" class="p-2 border rounded h-10" /> <!-- Image URL -->

        </div>
        <button type="submit" class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>

    <!-- Edit existing products -->
    <div class="my-8 p-2 w-full">

      <h2 class="text-2xl font-semibold mb-4">Products</h2>
      <div class="mb-4 p-4 border rounded bg-[#ffffff]" v-for="jewelryItem in jewelry" :key="jewelryItem._id"> <!-- Loop through the products -->
         <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" v-model="jewelryItem.name" placeholder="Name" class="p-2 border rounded"  /> <!-- Product name -->
          <input type="text" v-model="newJewelry.material" placeholder="Material" class="p-2 border rounded" />
          <input type="text" v-model="jewelryItem.description" placeholder="Description" class="p-2 border rounded" /> <!-- Product description -->
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Price: </span>
            <input type="number" v-model="jewelryItem.price" placeholder="Price" class=" pl-2 " /> <!-- Product price -->
          </div>
          <div class="p-2 border rounded">

            <span class="uppercase font-bold">Product Stock: </span>
            <input type="number" v-model="jewelryItem.stock" placeholder="Stock" class=" pl-2 " /> <!-- Product stock -->
          </div>
          <div class="p-2 border rounded flex items-center">

            <input type="checkbox" v-model="jewelryItem.isOnDiscount" class="border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Discount in %:</span> <!-- Discount in % -->
            <input type="number" v-model="jewelryItem.discount" placeholder="Discount %" class=" ml-2 pl-2 " /> <!-- Discount % -->
          </div>
          <div class="p-2 border rounded flex items-center ">
            <input type="checkbox" v-model="jewelryItem.isFeatured" class="p-2 border rounded w-6 h-6 mr-2" /> <span class="uppercase font-bold">Featured Product</span> 
          </div>
          <input type="text" v-model="jewelryItem.imageURL" placeholder="Image URL" class="p-2 border rounded h-10" /> <!-- Image URL -->
          <span>
            Thumbnail img: <img :src="jewelryItem.imageURL" alt="Product Image" class="w-full h-24 w-24 object-cover mb-4 rounded-lg"> <!-- Product image -->
          </span>
        </div>

        <div class="mt-4 flex space-x-2"> <!-- Update and delete buttons -->
          <p>ID:  </p> <!-- Product ID for testing -->
          <button @click="deleteJewelry(jewelryItem._id)" class="bg-red-600 text-white p-2 rounded hover:bg-red-700" >Delete</button> <!-- Delete button -->
          <button @click="updateJewelryHandler(jewelryItem)" class="bg-green-600 text-white p-2 rounded hover:bg-green-700">Edit</button> <!-- Edit button -->
         </div>
      </div>
    </div>
  </div>
     <!-- Custom confirmation dialog -->

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useJewelry } from '@/modules/useJewelry';
import type { newJewelry } from '@/interfaces/interfaces';
import type { Jewelry } from '@/interfaces/interfaces';

const { jewelry, error, loading, deleteJewelry, fetchJewelry, addJewelry, getTokenAndUserId, updateJewelry } = useJewelry();

onMounted(() => {
  fetchJewelry();
});

const newJewelry = ref(<newJewelry> {
  name: '',
  material: '', 
  description: '',
  price: 0,
  stock: 0,
  collection: '',
  isOnDiscount: false,
  discount: 0,
  isFeatured: false,
  imageURL: '',
  _createdBy: '',
})

const addJewelryHandler = async ():Promise<void> => {
  const {userId} = getTokenAndUserId();
  newJewelry.value._createdBy = userId;
  await addJewelry(newJewelry.value)
  newJewelry.value = {
   ...newJewelry.value,
  }
}

const updateJewelryHandler = async (jewelryItem: Jewelry) => {
  const updatedJewelry = {
    name: jewelryItem.name,
    material: jewelryItem.material,
    description: jewelryItem.description,
    price: jewelryItem.price,
    stock: jewelryItem.stock,
    isOnDiscount: jewelryItem.isOnDiscount,
    discount: jewelryItem.discount,
    isFeatured: jewelryItem.isFeatured,
    imageURL: jewelryItem.imageURL,
}
  await updateJewelry(jewelryItem._id, updatedJewelry);
}

</script>

<style scoped>
input {
  background-color: #ffffff;
}

.lazy-css {
  color: #000000 ;
}

input[type=checkbox] {
  accent-color: var(--input-field-color);
}

</style>
