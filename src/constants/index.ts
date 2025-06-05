import  { FaBrain }  from "react-icons/fa6";
import { GiDeskLamp } from "react-icons/gi";
import { FaLock } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface features{
    icon: React.ElementType;
    backgroundColor: string;
    title: string;
    details: string;
}
interface routesConstants{
title:string , 
route:string, 
}
interface statics {
    state:string  ;
    title:string ; 
    icon?:React.ElementType
}
export const routesConstants:routesConstants = {
    title:'Home',
    route:'/'       
}



export const features: features[] = [
    {
        icon:FaBrain , 
        backgroundColor:'bg-blue-500',
        title:'AI-Powered Intelligence',
        details:'Advanced machine learning algorithms that understand your code context and provide smart suggestions.'
    },
    {
        icon:GiDeskLamp , 
        title:'Smart Solutions',
        backgroundColor:'bg-purple-500',
        details:'Get instant help with debugging, optimization, and best practices across all programming languages.'
    },{
         icon:FaLock , 
        title:'Secure & Private ',
        backgroundColor:'bg-pink-500',
        details:'Your code and conversations are encrypted and completely private. We take security seriously.'
    },
]


export const statics :statics[]= [{
    state:'100' ,
    title:"Programming Languages"
},{
    state:'24/7' ,
    title:"AI Availability"
},{
    state:'1M+' ,
    title:"Developers"
},{
    state:'5' ,
    icon:FaStar,
    title:"Average Rating"
},]