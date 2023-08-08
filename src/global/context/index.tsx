"use client"
import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../reducer";
// import { auth } from "@/lib/firebase";
// import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import BASE_PATH_FORAPI from "@/components/shared/Wrapper/BasePath";

export const cartContext = createContext<any>(null);

interface indexForError {
    [key: string]: string
};


const ContextWrapper = ({ children }: { children: ReactNode }) => {
    let router = useRouter();
    const [userData, setUserData] = useState<any>();
    // const [errorViaUserCredential, setErrorViaUserCredential] = useState<indexForError | "">("")
    const [loading, setLoading] = useState(false);
    const [cartArray, setCartArray] = useState<any>([]);
    // const [errorsOfFirebase, setErrorsOfFirebase] = useState({
        //     key: "",
        //     errorMessage: "",
        // });
    const [quantity, setQuantity] = useState(1);
    // const initializerofCart = {
    //         cart: [],
    //     }
    // const [state, dispatch] = useReducer(cartReducer, initializerofCart)

    useEffect(() => {
        if (cartArray.length !== 0) {
            setQuantity(cartArray.length);
        }
    }, [cartArray])

    async function fetchApiForAllCartItems() {
        let res = await fetch(`${BASE_PATH_FORAPI}/api/cartfunc?user_id=` + window.userid)
        if(!res.ok){
            throw new Error("Faild to fetch")
        }
        let datatoreturn = await res.json()
        setCartArray(datatoreturn.allCartData)
    }

    useEffect(() => {
            fetchApiForAllCartItems();
    }, []);
    console.log("cartArray: ",cartArray);
    
    async function dispatch(payload: string, data: any, user_id: any) {
        if (payload === "addToCart") {
            console.log("func running of add to cart");
            await fetch(`${BASE_PATH_FORAPI}/api/cartfunc`, {
                method: "POST",
                body: JSON.stringify(data)
            });
        }
        else if (payload === "removeFromCart") {
            console.log("func running of remove to cart", data);
            let dataa = await fetch(`${BASE_PATH_FORAPI}/api/cartfunc?product_id=${data.product_id}&user_id=${data.user_id}`, {
                method: "DELETE",
            });
            let NotData = await dataa.json();
            console.log(NotData);
        } 
        fetchApiForAllCartItems()
    };
        // else if (payload === "updateCart") {
        //     setLoading(true);
        //     let dataa = await fetch(`${BASE_PATH_FORAPI}/api/cartfunc`, {
        //         method: "PUT",
        //         body: JSON.stringify(data)
        //     });
        //     let NotData = await dataa.json();
        //     setLoading(false);
        // }
        // let resp = await fetchApiForAllCartItems();
        // if (resp) {
        //     return "Success"
        // } else {
        //     return "Unsuccess"
        // }


    // async function fetchApiForAllCartItems() {
    //     if (userData) {
    //         let res = await fetch(`/api/cartfunc?user_id=${userData.uuid}`);
    //         if (!res.ok) {
    //             throw new Error("Failed to Fetch")
    //         }
    //         let dataToreturn = await res.json();
    //         await setCartArray((prev: any) => dataToreturn.allCartData);
    //         router.refresh();
    //         if (dataToreturn) {
    //             return true
    //         }
    //     }
    // }

    // useEffect(() => {
    //     fetchApiForAllCartItems();
    // }, [userData]);

    // async function dispatch(payload: string, data: any) {
    //     if (payload === "addToCart") {
    //         console.log("func running of add to cart");
    //         await fetch(`/api/cartfunc`, {
    //             method: "POST",
    //             body: JSON.stringify(data)
    //         });
    //     } else if (payload === "removeFromCart") {
    //         let dataa = await fetch(`/api/cartfunc?product_id=${data.product_id}&user_id=${data.user_id}`, {
    //             method: "DELETE",
    //         });
    //         let NotData = await dataa.json();
    //     } else if (payload === "updateCart") {
    //         setLoading(true);
    //         let dataa = await fetch(`/api/cartfunc`, {
    //             method: "PUT",
    //             body: JSON.stringify(data)
    //         });
    //         let NotData = await dataa.json();
    //         setLoading(false);
    //     }
    //     let resp = await fetchApiForAllCartItems();
    //     if (resp) {
    //         return "Success"
    //     } else {
    //         return "Unsuccess"
    //     }
    // };

    // let user = auth.currentUser;

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user: any) => {
    //         if (user) {
    //             setUserData({
    //                 displayName: user.displayName,
    //                 email: user.email,
    //                 uuid: user.uid,
    //                 photoUrl: user.photoURL,
    //                 emailVerified: user.emailVerified
    //             })
    //         } else {
    //             setUserData(null);
    //         }
    //     });
    // }, [])


    // let provider = new GoogleAuthProvider();

    // function signUpViaGoogle() {
    //     setLoading(true)
    //     return signInWithPopup(auth, provider).then((userData: any) => {
    //         if (userData) {
    //             setUserData({
    //                 displayName: userData.user.displayName,
    //                 email: userData.user.email,
    //                 uuid: userData.user.uid,
    //                 photoUrl: userData.user.photoURL,
    //                 emailVerified: userData.user.emailVerified
    //             });
    //             router.push("/")
    //         }
    //         setLoading(false)
    //     })
    // }


    // function signUpUser(email: string, password: string) {
    //     setLoading(true);
    //     createUserWithEmailAndPassword(auth, email, password).then((res: any) => {
    //         setLoading(false);
    //         router.push("/");
    //     }).catch((res: any) => {
    //         let error = res.code.split("/")
    //         error = error[error.length - 1];
    //         setErrorsOfFirebase({
    //             key: "signup",
    //             errorMessage: error
    //         })
    //         setLoading(false);
    //     });
    //     setLoading(false);
    // };

    // function signInUser(email: string, password: string) {
    //     setLoading(true);
    //     signInWithEmailAndPassword(auth, email, password).then((res: any) => {
    //         setLoading(false);
    //     }).catch((res: any) => {
    //         let error = res.code.split("/")
    //         error = error[error.length - 1];
    //         setErrorsOfFirebase({
    //             key: "signin",
    //             errorMessage: error
    //         })
    //     });
    //     setLoading(false);
    // }

    // function LogOut() {
    //     setLoading(true);
    //     signOut(auth);
    //     setLoading(false);
    //     window.location.reload();
    // };

    // function sendEmailVerificationCode() {
    //     setLoading(true);
    //     if (user) {
    //         sendEmailVerification(user).then((res: any) => {
    //             console.log("sended");
    //             window.location.href = "/"
    //         })
    //         setLoading(false);
    //     }
    // }


    // function updateUserNamePhoto(userName: string, photoURL?: string) {
    //     setLoading(true);
    //     if (user) {
    //         updateProfile(user, {
    //             displayName: userName, photoURL: "https://abdulbasit-self.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FAbdulBasit.40cf649b.png&w=640&q=75"
    //         }).then(() => {
    //             setLoading(false);
    //             window.location.reload();
    //         }).catch((error: any) => {
    //             setLoading(false);
    //             console.log(error)
    //         });
    //     }
    // }

    return (
        <cartContext.Provider value={{
            cartArray,
            // errorsOfFirebase,
            dispatch,
            // updateUserNamePhoto,
            userData,
            // sendEmailVerificationCode,
            // signUpUser,
            // signUpViaGoogle,
            // signInUser,
            // LogOut,
            loading,
            quantity,
            setQuantity,
        }}>
            {children}
        </cartContext.Provider>
    )
}

export default ContextWrapper

// "use client"
// import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
// import { cartReducer } from "../reducer";
// import BASE_PATH_FORAPI from "@/components/shared/Wrapper/BasePath";

// export const cartContext = createContext<any>(null)

// const ContextWrapper = ({ children }: { children: ReactNode }) => {
//     const [cartArray, setCartArray] = useState<any>([])
//     // let localVal = localStorage.getItem("cartState")
//     const initializerofCart = {
//         cart: [],
//     }
//     async function fetchApiForAllCartItems(){
    
//         let res = await fetch(`${BASE_PATH_FORAPI}/api/cartfunc`)
//         if(!res.ok){
//             throw new Error("failed to fetch")
//         }
//         let dataToreturn = await res.json()
//         setCartArray(dataToreturn)
//     }
//     useEffect(()=>{
//         fetchApiForAllCartItems()
//     },[])

//     async function dispatch(payload: string, data: any) {
//         console.log("database array of cart", cartArray);
        
//         console.log("func running of add to cart");
//                 if (payload === "addToCart") {
//                     await fetch(`${BASE_PATH_FORAPI}/api/cartfunc`, {
//                         method: "POST",
//                         body: JSON.stringify(data)
//                     });
//                 // } else if (payload === "removeFromCart") {
//                 //     let dataa = await fetch(`/api/cartfunc?product_id=${data.product_id}&user_id=${data.user_id}`, {
//                 //         method: "DELETE",
//                 //     });
//                 //     let NotData = await dataa.json();
//                 // } else if (payload === "updateCart") {
//                 //     // setLoading(true);
//                 //     let dataa = await fetch(`/api/cartfunc`, {
//                 //         method: "PUT",
//                 //         body: JSON.stringify(data)
//                 //     });
//                 //     let NotData = await dataa.json();
//                     // setLoading(false);
//                 // }
//                 // let resp = await fetchApiForAllCartItems();
//                 // if (resp) {
//                 //     return "Success"
//                 // } else {
//                 //     return "Unsuccess"
//                 // }
//             };
//     // const [state,dispatch] = useReducer(cartReducer, initializerofCart)
//     // useEffect(() => {
//     //     let cart = localStorage.getItem("cart") as string
//     //     if(cart === null){
//     //         localStorage.setItem("cart", JSON.stringify(state.cart))
//     //     }else{
//     //         initializerofCart.cart = JSON.parse(cart)
//     //     }
//     // })
//     // useEffect(()=>{
//     //     localStorage.setItem("cart", JSON.stringify(state.cart))
//     // }, [state.cart])
//     // const [cartArray, setCartArray] = useState<any>([]);
//     // const [quantity, setQuantity] = useState(0);

//     // useEffect(() => {
//     //     if (cartArray.length !== 0) {
//     //         setQuantity(cartArray.length);
//     //     }
//     // }, [cartArray])
//         }
//     return (
//         <cartContext.Provider value={{
//             cartArray,dispatch, 
//         // quantity,setQuantity
//         }}>
//             {children}
//         </cartContext.Provider>
//     )
// }
// export default ContextWrapper