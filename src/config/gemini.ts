import { GoogleGenerativeAI } from "@google/generative-ai";

localStorage.setItem('gemini_api_key' ,'AIzaSyCTU59FLXp0s7aIX5nDmcJjBkUpFQP7yF8')

const getApiKey =()=>{
    return localStorage.getItem('gemini_api_key');
}
export const initializeModel =()=>{
    const apiKey = getApiKey()
    if(!apiKey) return null ;
    const genAi = new GoogleGenerativeAI(apiKey)
    return genAi.getGenerativeModel({model:'gemini-2.0-flash'})

}
export const Model = initializeModel()