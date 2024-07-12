import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  serverTimestamp
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

auth.onAuthStateChanged((user) => {
  if (user) {
    fetchDocuments(); 
    loadComments(); 
  } else {
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

const magazineLayout = document.getElementById("magazine-layout");
const loginRequest = document.getElementById("login-request");
const spinner = document.getElementById("spinner");
const voteChocolate = document.getElementById("vote-chocolate");
const voteStrawberry = document.getElementById("vote-strawberry");
const commentText = document.getElementById("comment-text");
const submitComment = document.getElementById("submit-comment");

const totalVotesElement = document.getElementById("total-votes");
const chocolateVotesElement = document.getElementById("chocolate-votes");
const strawberryVotesElement = document.getElementById("strawberry-votes");
const commentsList = document.getElementById("comments-list");

const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const cover = document.getElementById('cover');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

/*revisar isso pq ta confuso*/
const songs = ['song1.mp3'];
const covers = ['./icons/pain.jpg'];
const songNames = ['pain'];
const songArtists = ['pinkpantheress'];

let currentSongIndex = 0;

function loadSong() {
  audioPlayer.src = songs[currentSongIndex];
  cover.src = covers[currentSongIndex];
  songName.textContent = songNames[currentSongIndex];
  songArtist.textContent = songArtists[currentSongIndex];
}

function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = 'Pause';
  } else {
    audioPlayer.pause();
    playBtn.textContent = 'Play';
  }
}

playBtn.addEventListener('click', togglePlay);

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong();
  if (!audioPlayer.paused) audioPlayer.play(); 
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong();
  if (!audioPlayer.paused) audioPlayer.play(); 
});

audioPlayer.addEventListener('timeupdate', () => {
  const { currentTime, duration } = audioPlayer;
  progressBar.value = (currentTime / duration) * 100;
});


progressBar.addEventListener('change', () => {
  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

loadSong();


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
        alert(`Bem-vindo de volta, ${user.displayName}`);
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

        await updateProfile(user, { displayName: username });

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username: username,
          createdAt: serverTimestamp(),
        });

        hideSpinner();
        alert(`Conta criada com sucesso! Bem-vindo, ${username}`);
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
  loginRequest.style.display = "block";
  magazineLayout.style.display = "none";
}

document
  .getElementById("btn-continue")
  .addEventListener("click", showBittersweetContent);
document.getElementById("btn-signin").addEventListener("click", showLoginForm);
document.getElementById("btn-signup").addEventListener("click", showSignUpForm);

voteChocolate.addEventListener("click", () => vote("chocolate"));
voteStrawberry.addEventListener("click", () => vote("strawberry"));

function vote(flavor) {
  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado para votar.");
    return;
  }

  const voteRef = doc(db, "votes", user.uid);

  setDoc(voteRef, { flavor }, { merge: true })
    .then(() => {
      alert(`Voto registrado: ${flavor}`);
      fetchVotes();
    })
    .catch((error) => {
      console.error("Erro ao registrar voto:", error);
    });
}

function fetchVotes() {
  getDocs(collection(db, "votes"))
    .then((querySnapshot) => {
      let totalVotes = 0;
      let chocolateVotes = 0;
      let strawberryVotes = 0;

      querySnapshot.forEach((doc) => {
        totalVotes++;
        if (doc.data().flavor === "chocolate") {
          chocolateVotes++;
        } else if (doc.data().flavor === "strawberry") {
          strawberryVotes++;
        }
      });

      totalVotesElement.textContent = totalVotes;
      chocolateVotesElement.textContent = chocolateVotes;
      strawberryVotesElement.textContent = strawberryVotes;
    })
    .catch((error) => {
      console.error("Erro ao buscar votos:", error);
    });
}

function loadComments() {
  getDocs(collection(db, "comments"))
    .then((querySnapshot) => {
      commentsList.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const comment = doc.data();
        displayComment(comment);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar comentários:", error);
    });
}

const avatars = [
  "https://i.pinimg.com/736x/a3/92/3a/a3923a22e211a1d4f33fba16c514284c.jpg",
  "https://i.pinimg.com/736x/17/d5/bb/17d5bbf9b7368a841ff995c7f2cfe915.jpg",
  "https://i.pinimg.com/736x/c8/36/df/c836dffba11432a8aed18e39179f4eb7.jpg",
  "https://i.pinimg.com/736x/d2/d7/ad/d2d7ad3bc9a72f57b631b5730d8b8622.jpg",
  "https://i.pinimg.com/736x/b2/99/87/b299879b4df862ee2a1d0abe8a9ed23e.jpg",
  "https://i.pinimg.com/736x/d2/a6/7f/d2a67f0e312369dfab2f5d0a527e1892.jpg",
  "https://i.pinimg.com/736x/bb/62/b7/bb62b753c2079ba9179975b1c70b4f73.jpg",
  "https://i.pinimg.com/736x/69/36/8e/69368e585219ea0d4e4c44078577ef34.jpg",
  "https://i.pinimg.com/736x/8e/f5/0c/8ef50cec266e5fa21ae8273301270c7b.jpg",
  "https://i.pinimg.com/736x/fe/22/ab/fe22ab7d15edf90aa6ec31f282f69929.jpg",
  "https://i.pinimg.com/736x/f8/19/21/f81921e0dba9083b7c378e3323b555f6.jpg",
  "https://i.pinimg.com/564x/22/30/77/2230772849e0be00eaffd456d0f555ad.jpg",
  "https://i.pinimg.com/564x/9e/21/0f/9e210f647381ca68785ed2553aa2de47.jpg",
  "https://i.pinimg.com/736x/c7/9e/d1/c79ed15806dac7577681321b6282ef46.jpg",
  "https://i.pinimg.com/736x/90/56/b2/9056b2d009bb25cd91aa094bef9244c5.jpg",
  "https://i.pinimg.com/564x/06/f0/b2/06f0b2ab6e496eebe341dda0c281dd63.jpg",
  "https://i.pinimg.com/564x/f3/a5/68/f3a568023c7ac253f828bf24b95cca3a.jpg",
  "https://i.pinimg.com/736x/f5/46/e1/f546e1ea808de522b937824471f7eb49.jpg",
  "https://i.pinimg.com/736x/a9/26/54/a92654e81418facac1d7897186407c1c.jpg",
  "https://i.pinimg.com/564x/5c/83/a6/5c83a6bcb5aa14f9df8d8f86eba7fe5f.jpg",
  "https://i.pinimg.com/564x/af/e1/16/afe1161e9d0803b40183e6f5dd05d36a.jpg",
  "https://i.pinimg.com/736x/0a/97/52/0a9752d184114a6c8bf4cd505e9e81a2.jpg",
  "https://i.pinimg.com/736x/a1/65/d3/a165d3766daec0a6f991cfeb282ee108.jpg",
  "https://i.pinimg.com/736x/16/30/8d/16308d3036d1c63d4e205e5fe38dedf5.jpg",
  "https://i.pinimg.com/736x/c3/ba/b1/c3bab132060ea341ad9128ddd8025bb7.jpg",
  "https://i.pinimg.com/736x/6b/58/bc/6b58bc776bb36afaf7fc569024cd7c21.jpg"
];

function displayComment(comment) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  const randomIndex = Math.floor(Math.random() * avatars.length);
  const userPhoto = avatars[randomIndex];

  commentElement.innerHTML = `
    <div class="user-info">
      <div class="comment-info">
        <img src="${userPhoto}" alt="User Photo">  
        <div class="user-timestamp">
          <p>${comment.username}</p>
          <span>${new Date(comment.timestamp.seconds * 1000).toLocaleString()}</span>
        </div>
      </div>
      <div class="user-comment">
        <p>${comment.text}</p>
      </div>
    </div>
    
  `;

  commentsList.appendChild(commentElement);
}


submitComment.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("você precisa estar logado para comentar.");
    return;
  }

  const commentTextValue = commentText.value.trim();
  if (!commentTextValue) {
    alert("hm está faltando algumas letras aqui.");
    return;
  }

  const randomPhotoUrl = `https://placehold.co/35x35?text=${Math.random().toString(36).substr(2, 5)}`;

  try {
    await addDoc(collection(db, "comments"), {
      userId: user.uid,
      username: user.displayName,
      text: commentTextValue,
      timestamp: serverTimestamp(),
      photoUrl: randomPhotoUrl,
    });

    commentText.value = "";
    loadComments();
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
  }
});

fetchVotes();
