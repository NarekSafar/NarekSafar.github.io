const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const passwordInput = document.querySelector(".input-box input");
const copyIcon = document.querySelector(".fa-regular.fa-copy")
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghigklmnopqrstuvwxwz" ,
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXWZ" ,
    numbers: "0123456789" ,
    symbols: "^!$%&|{}[]();:.,<>*#@-+~"
}


generateBtn.addEventListener('click' , generatePassword = () => {
    let staticPassword = "";
    let randomPassword = "";
    let excludeDuplicate = false;
    let passLength = lengthSlider.value;

    options.forEach((option) => {
        if(option.checked){
            if(option.id !=="exc-duplicate" && option.id !=="spaces"){
                staticPassword += characters[option.id];
            } else if(option.id =="spaces"){
                staticPassword += `  ${staticPassword}  `;
            } else{
                excludeDuplicate = true;
            }
        }
    });
     
    for(let i = 0; i < passLength; i++){
      let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
      if(excludeDuplicate){
          !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i-- ;
      } else{
           randomPassword += randomChar;
      }
    }
    
    passwordInput.value = randomPassword;

});



lengthSlider.addEventListener('input' , () => {
    document.querySelector(".pass-length span").innerHTML = lengthSlider.value;
    generatePassword();
    
    passIndicator.id = lengthSlider.value <= 6 ? "weak" : lengthSlider.value <= 14 ? "medium" : "strong";
});

copyIcon.addEventListener('click' , () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.style.opacity = "1";
    setTimeout(() => {
    copyIcon.style.opacity = "0.6";
    } , 1500)
})