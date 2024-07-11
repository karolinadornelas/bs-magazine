import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDeUCw5QdPTRSv4bEHJ1hb5x_LKW-PkyRk",
  authDomain: "bittersweet-k.firebaseapp.com",
  projectId: "bittersweet-k",
  storageBucket: "bittersweet-k.appspot.com",
  messagingSenderId: "344413815617",
  appId: "APP_ID",
  measurementId: "G-6EHR9HKEVX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
updateVoteCounts();

auth.onAuthStateChanged((user) => {
  if (user) {
    fetchDocuments(); 
  } else {
    //mandar para a página de de login?
    console.log("Usuário não autenticado.");
  }
});

function fetchDocuments() {
  const votesCollection = collection(db, "votes");

  getDocs(votesCollection)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.error("Erro ao consultar documentos:", error);
    });
}

const btnContinue = document.getElementById("btn-continue");
const btnSignIn = document.getElementById("btn-signin");
const btnSignUp = document.getElementById("btn-signup");
const magazineLayout = document.getElementById("magazine-layout");
const loginRequest = document.getElementById("login-request");
const spinner = document.getElementById("spinner");
const voteChocolate = document.getElementById("vote-chocolate");
const voteStrawberry = document.getElementById("vote-strawberry");
const totalVotesElement = document.getElementById("total-votes");
const chocolateVotesElement = document.getElementById("chocolate-votes");
const strawberryVotesElement = document.getElementById("strawberry-votes");
const commentForm = document.getElementById("comment-btn");

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

function showBittersweetContent() {
  hideSpinner();
  loginRequest.style.display = "none";
  magazineLayout.style.display = "block";
}

function showLoginForm() {
  loginRequest.innerHTML = `
        <div class="login-request-entry">
            <h2>bittersweet</h2>
            <p>já tem uma conta? show!</p>
            
            <form id="login-form">
                <label for="login-email">Email:</label>
                <input type="email" id="login-email" required>
                <label for="login-password">Senha:</label>
                <input type="password" id="login-password" required>            
                <div class="login-form-box">
                    <button type="submit">Entrar</button>
                    <button id="back-to-main">Voltar</button>
                </div>
            </form> 
        </div>
    `;

  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      loginRequest.style.display = "none";
      showSpinner();

      try {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        hideSpinner();
        alert(`Bem-vindo de volta, ${user.email}`);
        showBittersweetContent();
      } catch (error) {
        hideSpinner();
        alert(`Erro: ${error.message}`);
      }
    });

  document
    .getElementById("back-to-main")
    .addEventListener("click", showMainContent);
}

function showSignUpForm() {
  loginRequest.innerHTML = `
        <h2>bittersweet</h2>
        <p>vamos criar sua conta! é rapidinho.</p>
        <form id="signup-form">
            <label for="signup-email">Email:</label>
            <input type="email" id="signup-email" required>
            <label for="signup-password">Senha:</label>
            <input type="password" id="signup-password" required>
            <label for="signup-username">Username:</label>
            <input type="text" id="signup-username" required>
            
            <div class="signup-form-box">
                <button type="submit">Criar Conta</button>
                <button id="back-to-main">Voltar</button>    
            </div>
            
        </form>
    `;

  document
    .getElementById("signup-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const username = document.getElementById("signup-username").value;

      loginRequest.style.display = "none";
      showSpinner();

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: username,
        });
        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          userId: user.uid
        });

        hideSpinner();
        alert(`fique à vontade, ${username}`);
        showBittersweetContent();
      } catch (error) {
        hideSpinner();
        alert(`Erro: ${error.message}`);
      }
    });

  document
    .getElementById("back-to-main")
    .addEventListener("click", showMainContent);
}

function showMainContent() {
  loginRequest.innerHTML = `
        <h2>bittersweet</h2>
        <p>para ter acesso ao conteúdo interativo,
            faça o login ou crie uma conta.
        </p>
        <div class="btn-box">
            <button type="button" id="btn-continue">continuar sem logar</button>
            <button type="button" id="btn-signin">entrar</button>
            <button type="button" id="btn-signup">criar uma conta</button>
        </div>
    `;
  document.getElementById("btn-continue").addEventListener("click", () => {
    loginRequest.style.display = "none";
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      magazineLayout.style.display = "block";
    }, 500);
  });
  document
    .getElementById("btn-signin")
    .addEventListener("click", showLoginForm);
  document
    .getElementById("btn-signup")
    .addEventListener("click", showSignUpForm);
  updateVoteCounts();
}

btnContinue.addEventListener("click", () => {
  loginRequest.style.display = "none";
  showSpinner();
  setTimeout(() => {
    hideSpinner();
    magazineLayout.style.display = "block";
  }, 5000);
});
btnSignIn.addEventListener("click", showLoginForm);
btnSignUp.addEventListener("click", showSignUpForm);

//votação
voteChocolate.addEventListener("click", () => vote("chocolate"));
voteStrawberry.addEventListener("click", () => vote("strawberry"));

function vote(flavor) {
  const user = auth.currentUser;
  
  if (!user) {
    alert("você precisa estar logado para votar.");
    return;
  }
  
  const userVoteRef = doc(db, "votes", user.uid);

  getDocs(query(collection(db, "votes"), where("userId", "==", user.uid)))
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        alert("ops, você já votou. sem vira folhas aqui.");
      } else {
        setDoc(userVoteRef, {
          userId: user.uid,
          flavor: flavor,
        })
          .then(() => {
            alert(`então.. ${flavor}, né? beleza, registramos aqui`);
            updateVoteCounts(); //contagem em tempo real
          })
          .catch((error) => {
            console.error("Erro ao registrar voto:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Erro ao verificar voto existente:", error);
    });
}

//no firestore, para interações no geral, regra deve ser leitura pública
//permitida e contribuições restritas ao login
//exceto para criação de novo usuário que devem ser públicos write e read

function updateVoteCounts() {
  const votesCollection = collection(db, "votes");

  getDocs(votesCollection)
    .then((querySnapshot) => {
      let totalVotes = querySnapshot.size;
      let chocolateVotes = 0;
      let strawberryVotes = 0;

      querySnapshot.forEach((doc) => {
        const flavor = doc.data().flavor;
        if (flavor === "chocolate") {
          chocolateVotes++;
        } else if (flavor === "strawberry") {
          strawberryVotes++;
        }
      });

      totalVotesElement.textContent = `Total de Votos: ${totalVotes}`;
      chocolateVotesElement.textContent = `Votos em Chocolate: ${chocolateVotes}`;
      strawberryVotesElement.textContent = `Votos em Morango: ${strawberryVotes}`;
    })
    .catch((error) => {
      console.error("Erro ao atualizar contagem de votos:", error);
    });
}

//comentários
// commentForm.addEventListener("click", async () => {
//   const commentText = document.getElementById("comment-text").value.trim();
//   if (commentText === "") return;

//   try {
//     const user = auth.currentUser;
//     if (!user){
//       alert("você precisa estar logado para comentar.");

//     }

//     const commentData = {
//       userId: user.uid,
//       username: user.displayName,
//       comment: commentText,
//       timestamp: serverTimestamp(),
//     };

//     await addDoc(collection(db, "comments"), commentData);
//     document.getElementById("comment-text").value = "";
//     fetchComments(); // Atualiza a lista de comentários após adicionar um novo
//   } catch (error) {
//     console.error("Erro ao adicionar comentário:", error.message);
//     // Lógica para mostrar erro ao usuário, se necessário
//   }
// });

// // Função para buscar e exibir comentários
// function fetchComments() {
//   const commentsList = document.getElementById("comments-list");
//   getDocs(collection(db, "comments"))
//     .then((querySnapshot) => {
//       commentsList.innerHTML = "";
//       querySnapshot.forEach((doc) => {
//         const commentData = doc.data();
//         const commentHtml = `
//           <div class="comment">
//             <p><strong>${commentData.username}</strong> (${commentData.timestamp.toDate().toLocaleString()}):</p>
//             <p>${commentData.comment}</p>
//           </div>
//         `;
//         commentsList.innerHTML += commentHtml;
//       });
//     })
//     .catch((error) => {
//       console.error("Erro ao buscar comentários:", error.message);
//       // Lógica para mostrar erro ao usuário, se necessário
//     });
// }

// // Exemplo de chamada inicial para carregar comentários
// fetchComments();

// // Lógica para verificar autenticação do usuário
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // Usuário está autenticado
//     console.log(`usuário logado: ${user.displayName}`);
//     // Lógica adicional conforme necessário
//   } else {
//     // Usuário não está autenticado
//     console.log("usuário não autenticado.");
//     // Lógica adicional conforme necessário
//   }
// });
