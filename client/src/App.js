import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  async function listPhotographs() {
    const response = await fetch('http://localhost:9000/api/photographs');
    return response.json();
  }

  async function getProfile() {
    const response = await fetch('http://localhost:9000/api/profile');
    return response.json();
  }

  useEffect(() => {
    (async () => {
      const photographs = await listPhotographs();

      const row = document.querySelector('#photos').querySelector('.row');
      const modals = document.querySelector('#modals');

      const getImageMeta = (url, callback) => {
        var img = new Image();
        img.src = url;
        img.onload = function() { callback(this.width, this.height); };
      }

      const renderGallery = async (index, elements) => {
        if (index !== photographs.length) {
          const photograph = photographs[index];

          const { 
            _id,
            title,
            category,
            description,
            image_uri,
            taken_at
          } = photograph;

          await getImageMeta(
            image_uri,
            (width, height) => {
              let colSize = (width > height) ? 8 : 4;
              let imageType = (colSize === 8) ? 'wider' : 'higher';

              let image = `
              <div class="col-sm-${colSize} row-item" data-value="${category}">
                <div class="row-overlay" id="${_id}">
                  <div class="overlay-head">
                     ${title} <br/>
                     <span>${category}</span>
                  </div>
                  <div class="overlay-body">
                     ${description}
                  </div>
                  <div class="overlay-footer">
                     Me at ${taken_at}
                  </div>
                </div>

                <img src="${image_uri}" class="row-image" />
              </div>`;

              let modal = `
              <div class="custom-modal ${_id}">
                <div class="close">x</div>

                <img src="${image_uri}" class="modal-image ${imageType}" />

                <div class="modal-info">
                  <div class="info-head">
                    ${title} <br />
                    <span>${category}</span>
                  </div>
                    <div class="info-body">
                      ${description}
                    </div>
                    <div class="info-footer">
                      Me at ${taken_at}
                  </div>
                </div>
              </div>`;

              elements.push({ colSize, image, modal, category });

              if (index + 1 !== photographs.length) {
                renderGallery(index + 1, elements);
              } else {
                let i = 0;
                while (i !== -1) {
                  let positionToSwap = 0, toSwap = false;

                  for (let j = 0; j < elements.length; j++) {
                    if (toSwap) {
                      if (elements[j].colSize === 4) {
                        let k = elements[positionToSwap];
                        elements[positionToSwap] = elements[j];
                        elements[j] = k;
                        i = 0;
                        break;
                      }
                    } else if (elements[j].colSize === 8) {
                      if (i !== 0 && i % 3 !== 0 && (i - 1) % 3 !== 0) {
                        toSwap = true;
                        positionToSwap = j;
                      } else {
                        i = 0;
                      }
                    } else {
                      i++;
                    }

                    if (j === elements.length - 1) i = -1;
                  }
                }

                let categories = [];
                elements.forEach(element => {
                    row.innerHTML += element.image;
                    modals.innerHTML += element.modal;

                    if (categories.includes(element.category) === false) {
                        categories.push(element.category);
                    }
                });

                let overlays = document.querySelectorAll('.row-overlay');
                overlays.forEach(overlay => {
                  let modalClass = overlay.id;
                  let modal = document
                              .getElementsByClassName(`${modalClass}`)[0];
                  let closeModal = modal.getElementsByClassName('close')[0];
                  let html = document.querySelector('html');

                  overlay.addEventListener('click', () => {
                    let scrollTop = document.documentElement.scrollTop;
                    modal.style.display = 'grid';
                    modal.style.top = `${scrollTop}px`;
                    html.style.overflow = 'hidden';

                    document.onkeydown = (e) => {
                      e = e || window.event;
                      let isEscape;
                      if ("key" in e) {
                        isEscape = (e.key === "Escape" || 
                                    e.key === "Esc");
                      } else {
                        isEscape = (e.keyCode === 27);
                      }

                      if (isEscape) {
                        modal.style.display = 'none';
                        html.style.overflow = 'auto';
                      }
                    };
                  });

                  closeModal.addEventListener('click', () => {
                    modal.style.display = 'none';
                    html.style.overflow = 'auto';
                  });
                });
              }
            }
          );
        }
      }

      await renderGallery(0, []);

      const profileList = await getProfile();
      const profileData = profileList[0];

      let footer = document.querySelector('footer');
      let currentYear = new Date().getFullYear();

      const {
          _id,
          name,
          photo_uri,
          bio,
          facebook,
          instagram,
          twitter,
          email
      } = profileData;

      const profile = document.getElementById('profile');
      profile.innerHTML = `
      <div class="photo"><img src="${photo_uri}" /></div>

      <h2 class="name">${name}</h2>
      <h6 class="email">${email}</h6>
      <div class="social-media">
        <a href="${facebook}"><i class="fab fa-facebook-f"></i></a> &nbsp;
        <a href="${twitter}"><i class="fab fa-twitter"></i></a> &nbsp;
        <a href="${instagram}">
          <i style="font-weight: bold" class="fab fa-instagram"></i>
        </a>
      </div>

      <h3 class="bio">${bio}</h3>`;

      footer.innerHTML = `
      <a href="${facebook}"><i class="fab fa-facebook-f"></i></a>
      <a href="mailto:${email}"><i class="fas fa-at"></i></a>
      <a href="${twitter}"><i class="fab fa-twitter"></i></a>
      <a href="${instagram}">
          <i style="font-weight: bold" class="fab fa-instagram"></i>
      </a>
      <br /> 
      <span>${name} &copy; ${currentYear} </span>`;
    })();

  }, []);

  return (
    <div className="App">
      <section className="home">
        <h1 className="home-hero">
          Hello. My name is Tanvi Dhupkar and this is my portfolio
        </h1>

        <nav id="home-nav">
          <span id="home">Home</span>
          <span id="portfolio">Portfolio</span>
          <span id="about">About</span>
          <span id="contact">Contact</span>
        </nav>
      </section>

      <section className="pages">
        <header className="pages-bar">
          <img src="http://via.placeholder.com/100" alt="logo" />

          <nav id="nav-header">
            <span id="home">Home</span>
            <span id="portfolio" className="dropdown">
              Portfolio
              <span>
              </span>
            </span>
            <span id="about">About</span>
            <span id="contact">Contact</span>
          </nav>
        </header>

        <main>
          <section id="photos">
            <div className="container">
               <div className="row"></div>
            </div>
          </section>

          <section id="profile"></section>

          <section id="contact"></section>

          <section id="modals"></section>
        </main>

        <footer></footer>
      </section>
    </div>
  );
}

export default App;
