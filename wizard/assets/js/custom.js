function save_data(data) {
  axios
    .post("http://localhost:8000/api/profile/", data, {
      headers: {
        accept: "application/json",
      },
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        window.location.assign("index.html");
      }
    })
    .catch((error) => {
      console.log(error.response.data["message"]);
      window.alert(error.response.data["message"]);
    });
}

// wizard
const wizard = document.getElementById("formWizard");

// submit event handler
wizard.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(wizard);
  let mydata = {};

  formData.forEach((value, key) => {
    mydata[key] = value;
  });

  console.log(mydata);
  save_data(mydata);
});
