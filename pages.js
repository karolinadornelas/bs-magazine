const pages = [
  {
    id: 1,
    content: `
            <div class="page" id="page1">
                <h3>Página 1</h3>
                <p>capa</p>
            </div>
        `,
  },
  {
    id: 2,
    content: `
            <div class="page" id="page2">
                <h3>Página 2</h3>
                <p>sumário</p>
            </div>
        `,
  },
  {
    id: 3,
    content: `
            <div class="page" id="page3">
                <div id="page-3">
                    <div id="ichiko-side">
                        <p>ICHIKO AOBA</p>
                        <span class="side-text">青葉市子</span>
                        
                        <div id="poster">
                            <div class="show-list">
                                <ul class="agust">
                                    <li>UK & EU</li>
                                    <li>AGOSTO</li>
                                    <li>20 Wales, gb, Festival do Homem Verde</li>
                                    <li>25 Glasgow, GB Hug & Pint</li>
                                    <li>26 Copenhagen, DK, Vega</li>
                                    <li>30 Manchester, GB, Royal Universidade de Musica</li>
                                </ul>

                                <ul class="oct">
                                    <li>AMERICA DO NORTE</li>
                                    <li>OUTUBRO</li>
                                    <li>Los Angeles, CA, Masonic Lodge 14</li>
                                    <li>São Francisco, CA, Swedish America Hall 15</li>
                                    <li>Seattle, WA, The Neptune Theatre 17</li>
                                    <li>Portland, OR, Polaris Hall 18</li>
                                    <li>Chicago, IL, Constelation 21</li>
                                    <li>Toronto, MA, National Sawdust 26</li>
                                    <li>Filadelfia, PA, World Cafe Live 28</li>
                                </ul>   
                            </div>

                            <div class="show-list-cont">
                                <ul class="sept">
                                    <li>SETEMBRO</li>
                                    <li>03 LONDRES, DE, Corte de Milton</li>
                                    <li>07 Berlim, DE, Klezsalon</li>
                                    <li>08 Jena, DE, TRAFO</li>
                                    <li>09 Monique, DE, Happel & Ettlich</li>
                                    <li>11 Stuttgart, DE Berkonzert</li>
                                </ul>
                            </div>

                            <img class="poster-jpg" src="./assets/page-3/ichiko-aoba-pg.jpg" alt="">
                            <img class="draw" src="./assets/page-3/ichiko-draw.png" alt="">
                            <div id="ichiko-entreview">
                                <p>Conhecida por sua voz etérea e melodias suaves, Ichiko conquistou fãs ao redor do mundo
                                    com sua música única e comovente. Agora, ela traz sua mágica ao vivo para palcos de diversas cidades, 
                                    proporcionando aos fãs a oportunidade rara de vivenciar sua arte de perto. 
                                    A turnê será uma celebração de seu mais recente álbum e de suas clássicas canções que conquistaram o 
                                    coração de muitos. "Estou extremamente animada para compartilhar minha música com vocês ao vivo! Cada 
                                    show é uma troca de emoções e energia, e mal posso esperar para criar memórias inesquecíveis com meus 
                                    fãs ao redor do mundo. Espero vê-los em breve."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="pottery-side">
                        <div class="store-description">
                            <img src="./assets/page-3/ghibli-pots.png" alt="xícaras diversas, personalizadas com personagens ghibli mais populares">
                            <p class="pots-desc">Descubra a magia em cada xícara na Topottery! A lojinha de cerâmica onde cada peça é uma obra de arte única 
                            inspirada pelos adorados personagens do Studio Ghibli. Seja você fã de Totoro, Chihiro ou Kiki, temos a xícara 
                            perfeita para adicionar um toque encantador ao seu dia a dia. Nossas xícaras personalizadas são feitas à mão com
                            amor e cuidado, garantindo que cada uma capture a essência dos personagens que você tanto ama.
                            </p>
                        </div>
                        <div class="tottopottery">
                            <h2>Tottopottery</h2>
                        </div>
                    </div>
                </div>
            </div>
        `,
  },
  {
    id: 4,
    // content: `<div class="page" id="page4">
    //             <div id="page-4">
    //                 <div id="ichiko-side">
    //                     <p>ICHIKO AOBA</p>
    //                     <span class="side-text">青葉市子</span>

    //                     <div id="poster">
    //                         <div class="show-list">
    //                             <ul class="agust">
    //                                 <li>UK & EU</li>
    //                                 <li>AGOSTO</li>
    //                                 <li>20 Wales, gb, Festival do Homem Verde</li>
    //                                 <li>25 Glasgow, GB Hug & Pint</li>
    //                                 <li>26 Copenhagen, DK, Vega</li>
    //                                 <li>30 Manchester, GB, Royal Universidade de Musica</li>
    //                             </ul>

    //                             <ul class="oct">
    //                                 <li>AMERICA DO NORTE</li>
    //                                 <li>OUTUBRO</li>
    //                                 <li>Los Angeles, CA, Masonic Lodge 14</li>
    //                                 <li>São Francisco, CA, Swedish America Hall 15</li>
    //                                 <li>Seattle, WA, The Neptune Theatre 17</li>
    //                                 <li>Portland, OR, Polaris Hall 18</li>
    //                                 <li>Chicago, IL, Constelation 21</li>
    //                                 <li>Toronto, MA, National Sawdust 26</li>
    //                                 <li>Filadelfia, PA, World Cafe Live 28</li>
    //                             </ul>
    //                         </div>

    //                         <div class="show-list-cont">
    //                             <ul class="sept">
    //                                 <li>SETEMBRO</li>
    //                                 <li>03 LONDRES, DE, Corte de Milton</li>
    //                                 <li>07 Berlim, DE, Klezsalon</li>
    //                                 <li>08 Jena, DE, TRAFO</li>
    //                                 <li>09 Monique, DE, Happel & Ettlich</li>
    //                                 <li>11 Stuttgart, DE Berkonzert</li>
    //                             </ul>
    //                         </div>
    //                         <img class="poster-jpg" src="./assets/page-3/ichiko-aoba-pg.jpg" alt="">
    //                         <img class="draw" src="./assets/page-3/ichiko-draw.png" alt="">
    //                         <div id="ichiko-entreview">
    //                             <p>Conhecida por sua voz etérea e melodias suaves, Ichiko conquistou fãs ao redor do mundo
    //                                 com sua música única e comovente. Agora, ela traz sua mágica ao vivo para palcos de diversas cidades,
    //                                 proporcionando aos fãs a oportunidade rara de vivenciar sua arte de perto.
    //                                 A turnê será uma celebração de seu mais recente álbum e de suas clássicas canções que conquistaram o
    //                                 coração de muitos. "Estou extremamente animada para compartilhar minha música com vocês ao vivo! Cada
    //                                 show é uma troca de emoções e energia, e mal posso esperar para criar memórias inesquecíveis com meus
    //                                 fãs ao redor do mundo. Espero vê-los em breve."
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <div class="pottery-side">
    //                     <h2>Topottery</h2>
    //                 </div>
    //             </div>
    //         </div>`,
  },
];

const magazine = document.getElementById("magazine");

function createPages() {
  pages.forEach((page) => {
    const pageDiv = document.createElement("div");
    pageDiv.innerHTML = page.content;
    magazine.appendChild(pageDiv);
  });
}

function updatePageVisibility() {
  document.querySelectorAll(".page").forEach((page, index) => {
    page.style.display = index + 1 === currentPage ? "block" : "none";
  });
}

let currentPage = 1;
const totalPages = pages.length;

document.getElementById("nextPage").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    updatePageVisibility();
  }
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updatePageVisibility();
  }
});

createPages();
updatePageVisibility();
