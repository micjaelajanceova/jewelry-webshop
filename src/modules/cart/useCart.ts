import {computed, ref, watch} from 'vue';
import type { CartItem, OrderItems } from '../../interfaces/interfaces';

export const useCart = () => {
 const cart = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
 
 const addToCart = (jewelry: Omit<CartItem, 'quantity'>) => {
    const existingItem = cart.value.find(item => item._id === jewelry._id);
    if (existingItem) {
        existingItem.quantity += 1;
        console.log('Updated quantity in cart:', existingItem);
    } else {
        cart.value.push({ ...jewelry, quantity: 1 });
        console.log('Added to cart:', jewelry);
    }
    localStorage.setItem('cart', JSON.stringify(cart.value));
    console.log('Current cart:', cart.value);
 }


    const removeFromCart = (itemId: string) => {
        const existingItem = cart.value.find(item => item._id === itemId);
      if (existingItem) {
        cart.value = cart.value.filter(item => item._id !== itemId);
        console.log('Removed from cart:', existingItem);
        localStorage.setItem('cart', JSON.stringify(cart.value));
      }
    }

    const updatedQuantity = (itemId: string, newQuantity: number) => {
       const item = cart.value.find(item => item._id === itemId);
       localStorage.setItem('cart', JSON.stringify(cart.value));
       if (item) {
         item.quantity = newQuantity;
         if (item.quantity <= 0) {
           removeFromCart(itemId);
         }
         else {
              localStorage.setItem('cart', JSON.stringify(cart.value));
         }
       }
       console.log('Updated cart:', cart.value);
    }

    const cartTotal = (): number => {
        return Number(cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));
    }

    const cartTotalIndividualJewelry = (itemId: string) => {
        const item = cart.value.find(item => item._id === itemId);
        return item ? item.price * item.quantity : 0;
    };

    const salesTax = (): number => {
        const taxRates = 0.25
        return Math.round(cartTotal() * taxRates * 100) / 100;
    }

    const code = ref<string>('');


    const couponCodeDiscount =(codes: string) => {
            const couponCodeAccepted = codes === 'DISCOUNT';
            return couponCodeAccepted ? 0.9 : 1;
    }

    const grandTotal = (): number => {
        return Number(((cartTotal() + salesTax()) * couponCodeDiscount(code.value)).toFixed(2));

    }


    const orders = ref<OrderItems[]>(JSON.parse(localStorage.getItem('orders') || '[]'));


    watch(orders, (newOrders) => {
        localStorage.setItem('orders', JSON.stringify(newOrders));
    }, { deep: true });

     const checkOutBuy = () => {
        const newOrder: OrderItems = {
            _id: `order${orders.value.length + 1}`,
            orderDate: new Date().toISOString(),
            total: cartTotal(),
            orderStatus: 'Processing',
            userName: 'John Doe',
            orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
            orderLine: cart.value.map(item => ({
                jewelry: {
                    _id: item._id,
                    name: item.name,
                    material: '',
                    description: '',
                    imageURL: item.imageURL,
                    price: item.price,
                    stock: 0,
                    collection: '',
                    isOnDiscount: false,
                    discount: 0,
                    isFeatured: false,
                    _createdBy: ''

     },
                quantity: item.quantity
            }))
        };
        orders.value.push(newOrder);
        cart.value = [];
        localStorage.setItem('cart', JSON.stringify(cart.value));
        console.log('Order placed:', orders.value);
        localStorage.setItem('orders', JSON.stringify(orders.value));
    }


    return { 
        cart, 
        addToCart,
        updatedQuantity,

        cartTotal,
        cartTotalIndividualJewelry,
        salesTax,
        code,
        grandTotal,
        orders,
        checkOutBuy
    };
}