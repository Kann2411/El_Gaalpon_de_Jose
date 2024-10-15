import { ILogin, IRegister, IUser } from "@/interfaces/interfaces";

export async function postSignIn (credential: ILogin) {
    try {
        const response = await fetch("http://localhost:3000/auth/signin",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credential)
        })

        if (!response.ok) {
            throw new Error (`Error: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        return result

    } catch (error) {
        console.log(error)
        return null        
    }
}


export async function postSignUp (user: Omit<IUser, "id">) {
    if (!user) {
        return null
}    
    try {
        const response = await fetch("http://localhost:3000/auth/signup",{
            method: "POST",
            headers: {  
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        if (!response.ok) {
            throw new Error (`Error: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        return result

    } catch (error) {
        console.log(error)
        return null
    }
        }