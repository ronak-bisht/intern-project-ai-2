"use client"
import API_URL from "../../config/config";
import BlogList from "./components/BlogList";

export default function Home() {
  console.log(API_URL)
  return (
    
    <BlogList />
  );
}
