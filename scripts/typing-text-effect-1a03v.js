function Type(text, i, fnCallback) {
    
    if (i < text.length) {
      
      document.getElementById("typed-text-ci2D4").innerHTML += text.charAt(i);
      
      i++;

      setTimeout(() => {
        
        typeWriter(text, i, fnCallback);
        
      }, 100);
      
    } else if (typeof fnCallback === "function") {
      
      setTimeout(fnCallback, 700);
      
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    
    const TextType = document.getElementById("typed-text-container-ci2D4").textContent;

    Type(TextType, 0, () => {
      
      document.getElementById("typed-text").innerHTML += '<span class="typing-cursor"></span>';
      
    });
  });
