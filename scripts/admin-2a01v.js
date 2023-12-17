const Password = document.getElementById('password');

const CorrectPassword = process.env.ADMIN_PASSWORD_HASH;
const Salt =  process.env.ENCODING_SALT

function HashP(password, salt) {
  return new Promise((resolve, reject) => {
    try {
      
      const encoder = new TextEncoder();
      const data = encoder.encode(password + salt);

      crypto.subtle.digest('SHA-256', data)
        .then(hashBuffer => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          resolve(hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''));
        })
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
}

document.getElementById('login').addEventListener('submit', async function(event) {
  event.preventDefault();

  try {
    const HashedInputPassword = await HashP(Password.value, Salt);

    if (HashedInputPassword === CorrectPassword) {

      if (localStorage.getItem("logged-in") === "true") {
        return;
      }

      var expiration = new Date().getTime() + 60 * 1000;
      localStorage.setItem("logged-in", "true");
      localStorage.setItem("expiration", expiration);

      window.location.reload();

    } else {

      console.log("Incorrect Password.")

    }
  } catch (error) {
    console.error("Error hashing password:", error);
  }
});

if (localStorage.getItem("logged-in") === "true") {
  var expiration = localStorage.getItem("expiration");

  if (expiration < new Date().getTime()) {

    localStorage.removeItem("logged-in");
    localStorage.removeItem("expiration");

    window.location.href = "https://staledisfiguredgeeklog.poll0s.repl.co/";
  } else {
    // window.location.href = "https://www.hardbobby.xyz/"; 
    // Change to admin page (TODO)
  }
}
