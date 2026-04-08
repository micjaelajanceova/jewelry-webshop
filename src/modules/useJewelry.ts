import {ref} from 'vue'
import type { Jewelry, newJewelry } from '../interfaces/interfaces'

export const useJewelry = () => {
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const jewelry = ref<Jewelry[]>([]);

    const fetchJewelry = async (): Promise<void> => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch('https://jewelry-rest-api.onrender.com/api/jewelry');
            if (!response.ok) {
                throw new Error('Failed to fetch jewelry');
            }
            const data: Jewelry[] = await response.json();
            jewelry.value = data;
            console.log("Fetched jewelry", jewelry.value);
        } catch (err) {
            error.value = (err as Error).message
        } finally {
            loading.value = false;
        }
    }


    const getTokenAndUserId = (): { token: string, userId: string } => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

            if (!token) {
                
                throw new Error('No authentication token found');
            }

            if (!userId) {
                console.log("no id token found in localStorage", localStorage.getItem('userId'));
                throw new Error('No user ID token found');
            }

            return { token, userId };
    }


    const validateJewelry = (jewelry: newJewelry): void => {
        if (!jewelry.name || !jewelry.material) {
            throw new Error('Name and material are required fields');
        }
    }

    const setDefaultValues = (jewelry: newJewelry, userId: string) => {
        return {
            name: jewelry.name,
            material: jewelry.material,
            description: jewelry.description || 'A beautiful piece of jewelry',
            imageURL: jewelry.imageURL || 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=500&q=80',
            price: jewelry.price || 100,
            stock: jewelry.stock || 10,
            collection: jewelry.collection || 'Spring 2025', // for later if needy
            isOnDiscount: jewelry.isOnDiscount || false,
            discount: jewelry.discount || 0,
            isFeatured: jewelry.isFeatured || false,
            _createdBy: userId
        }
    }


    
    const addJewelry = async (jewelry: newJewelry): Promise<void> => {
        try {
            const { token, userId } = getTokenAndUserId();
            validateJewelry(jewelry);
            const jewelryWithDefaults = setDefaultValues(jewelry, userId);
            console.log("id", userId);
            console.log("wuut", jewelryWithDefaults);

            const response = await fetch('https://jewelry-rest-api.onrender.com/api/jewelry', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`, // (recommended)
                },
                body: JSON.stringify(jewelryWithDefaults),
              });
              
              const contentType = response.headers.get('content-type') || '';
              const raw = await response.text(); // read ONCE
              
              let payload: any = raw;
              if (contentType.includes('application/json')) {
                try {
                  payload = JSON.parse(raw);
                } catch {
                  // keep raw as string
                }
              }
              
              if (!response.ok) {
                const message =
                  (payload && typeof payload === 'object' && (payload.error || payload.message)) ||
                  (typeof payload === 'string' ? payload : null) ||
                  `Request failed (${response.status})`;
                throw new Error(message);
              }
              
              // if OK, payload is already parsed (or string)
              console.log('Added new jewelry', payload);
              await fetchJewelry();
        }
        catch (err) {
            error.value = (err as Error).message
        }
    }

const deleteJewelryFromServer = async (id: string, token: string): Promise<void> => {
    const response = await fetch(`https://jewelry-rest-api.onrender.com/api/jewelry/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(text || 'Failed to delete jewelry')
    }
  }

  const removeJewelryFromState = (id: string): void => {
    jewelry.value = jewelry.value.filter(jewelryItem => jewelryItem._id !== id)
    console.log('Deleted jewelry with ID:', id)
  }

  const deleteJewelry = async (id: string): Promise<void> => {
    try {
      const { token } = getTokenAndUserId()
      await deleteJewelryFromServer(id, token)
      removeJewelryFromState(id)
    } catch (err) {
      error.value = (err as Error).message
    }
  }

  const updateJewelryOnServer = async (
    id: string,
    updatedJewelry: Partial<Jewelry>,
    token: string
  ) => {
    const response = await fetch(`https://jewelry-rest-api.onrender.com/api/jewelry/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedJewelry)
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(text || 'Failed to update jewelry')
    }

    const responseData = await response.text()
    try {
      return JSON.parse(responseData)
    } catch {
      return { message: responseData } as unknown as Jewelry
    }
  }

  const updateJewelryInState = (id: string, updatedJewelry: Jewelry) => {
    const index = jewelry.value.findIndex(item => item._id === id)
    if (index !== -1) {
      jewelry.value[index] = updatedJewelry
    }
  }

  const updateJewelry = async (id: string, updatedJewelry: Partial<Jewelry>): Promise<void> => {
    try {
      const { token } = getTokenAndUserId()
      const updatedJewelryResponse = await updateJewelryOnServer(id, updatedJewelry, token)
      updateJewelryInState(id, updatedJewelryResponse)
      await fetchJewelry()
    } catch (err) {
      error.value = (err as Error).message
    }
  }


    return {
        error,
        loading,
        jewelry,
        fetchJewelry,
        deleteJewelry,
        addJewelry,
        getTokenAndUserId,
        updateJewelry
    }
    }