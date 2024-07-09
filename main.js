import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';
import { getFirestore, setDoc, doc } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDeUCw5QdPTRSv4bEHJ1hb5x_LKW-PkyRk",
    authDomain: "bittersweet-k.firebaseapp.com",
    projectId: "bittersweet-k",
    storageBucket: "bittersweet-k.appspot.com",
    messagingSenderId: "344413815617",
    appId: "1:344413815617:web:68dcbbbc0a6f97bfc657c0",
    measurementId: "G-6EHR9HKEVX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const btnContinue = document.getElementById('btn-continue');
const btnSignIn = document.getElementById('btn-signin');
const btnSignUp = document.getElementById('btn-signup');
const magazineLayout = document.getElementById('magazine-layout');
const loginRequest = document.getElementById('login-request');
const spinner = document.getElementById('spinner');

function showSpinner() {
    spinner.style.display = 'block';
}

function hideSpinner() {
    spinner.style.display = 'none';
}

function showBittersweetContent(){
    hideSpinner();
    loginRequest.style.display = 'none';
    magazineLayout.style.display = 'block';
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

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        loginRequest.style.display='none';
        showSpinner();

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                hideSpinner();
                alert(`Bem-vindo de volta, ${user.email}`);
                showBittersweetContent();
            })
            .catch(error => {
                hideSpinner();
                alert(`Erro: ${error.message}`);
            });
    });

    document.getElementById('back-to-main').addEventListener('click', showMainContent);
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

    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const username = document.getElementById('signup-username').value;
        
        loginRequest.style.display='none';
        showSpinner();

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: username
                }).then(() => {
                    setDoc(doc(db, "users", user.uid), {
                        username: username,
                        email: email
                    });

                    hideSpinner();
                    alert(`Um novo membro acaba de surgir, fique à vontade ${username}`);
                    showBittersweetContent();
                }).catch(error => {
                    hideSpinner();
                    alert(`Erro ao atualizar o perfil: ${error.message}`);
                });
            })
            .catch(error => {
                hideSpinner();
                alert(`Erro: ${error.message}`);
            });
    });

    document.getElementById('back-to-main').addEventListener('click', showMainContent);
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
    document.getElementById('btn-continue').addEventListener('click', () => {
        loginRequest.style.display = 'none';
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            magazineLayout.style.display = 'block';
        }, 500);
    });
    document.getElementById('btn-signin').addEventListener('click', showLoginForm);
    document.getElementById('btn-signup').addEventListener('click', showSignUpForm);
}

btnContinue.addEventListener('click', () => {
    loginRequest.style.display = 'none';
    showSpinner();
    setTimeout(() => {
        hideSpinner();
        magazineLayout.style.display = 'block';
    }, 5000);
});
btnSignIn.addEventListener('click', showLoginForm);
btnSignUp.addEventListener('click', showSignUpForm);

showMainContent();
