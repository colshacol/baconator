import React from "react"
import { View } from "../components/View"

export const UserLogin = () => {
  React.useEffect(() => {
    const form = document.querySelector("#pageContent form")
    const formContainer = document.getElementById("formContainer")
    formContainer.appendChild(form)
    form.style.display = "flex"
    form.style.flexDirection = "column"
  }, [])

  return (
    <View>
      <View.Header data-testid='View.Header'>
        <View.Title>Create an account</View.Title>
        <View.Description>
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
          vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </View.Description>
      </View.Header>
      <View.Content>
        <div id='formContainer' />
      </View.Content>
    </View>
  )
}
