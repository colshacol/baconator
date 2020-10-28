import React from "react"
import { View } from "../components/View"

export const Challenge = () => {
  React.useEffect(() => {
    const child = document.querySelector("#pageContent > div")
    const formContainer = document.getElementById("formContainer")
    formContainer.appendChild(child)
  }, [])

  return (
    <View>
      <div id='formContainer' />
    </View>
  )
}
