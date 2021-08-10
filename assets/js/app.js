(() => {
  "use strict";
  let worker;
  const root = document.getElementById("root");

  // Add web worker
  worker = new Worker("ServiceWorker.js", { type: "module" });
  worker.addEventListener("message", workerMessage);
  worker.addEventListener("error", workerError);

  worker.postMessage("start");
  function workerMessage(data) {
    console.log("data:", data);
  }

  function workerError(error) {
    console.log("error from web worker:", error);
  }

  typeof Worker !== "undefined";
  worker = new Worker("serviceWorker.js", { type: "module" });

  worker.onmessage = (e) => {
    const message = e.data;
    console.log(`[From Worker]: ${message}`);
  };

  worker.postMessage("Marco!");

  const url = "https://jsonserver8421.herokuapp.com/info";
  // fetch("http://localhost:3333/info")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     console.log("server url:", data);
  //     // mainProgram(data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  console.log("dummy data.js:", data);
  mainProgram(data);

  function mainProgram(data) {
    function createMain(data) {
      const mainShow = onlyDiv();
      mainShow.setAttribute("class", "mainShow addFlex");
      const box = onlyDiv();
      box.setAttribute("class", "box");
      const profileContent = onlyDiv();
      profileContent.setAttribute(
        "class",
        "profileContent addFlex profileCenter"
      );
      const profileImage = onlyDiv();
      profileImage.setAttribute("class", "profileImage");
      const imageClass = document.createElement("span");
      imageClass.setAttribute("class", "imageClass");
      if (data.profile.profileImage === "Nil") imageClass.innerHTML = getSvg();
      else {
        const image = document.createElement("img");
        if (data.wantItAh.wantBorder) image.classList.add("wantBorder");
        if (data.wantItAh.wantShadow) image.classList.add("wantShadow");
        image.src = data.profile.profileImage;
        image.alt = "No image";
        imageClass.appendChild(image);
      }
      profileImage.appendChild(imageClass);
      const profileInfo = onlyDiv();
      profileInfo.setAttribute("class", "profileInfo");
      const profileName = onlyDiv();
      profileName.setAttribute("class", "profileName");
      profileName.innerHTML = `<span>${data.profile.profileName}</span>`;
      profileInfo.appendChild(profileName);
      if (data.profile.profileDescription !== "Nil") {
        const profileDescription = onlyDiv();
        profileDescription.setAttribute("class", "profileDescription");
        profileDescription.innerHTML = `
    <p class="profileText forText">${data.profile.profileDescription}</p>
    
    `;
        profileInfo.appendChild(profileDescription);
      }
      profileContent.append(profileImage, profileInfo);
      if (data.profile.profileHeader !== "Nil") {
        const profileHeader = onlyDiv();
        profileHeader.setAttribute("class", "profileHeader forText");
        profileHeader.innerHTML = `
    <h3>${data.profile.profileHeader}</h3>
    `;
        profileContent.appendChild(profileHeader);
      }
      if (data.socialLink.length !== 0) {
        const profileSocial = onlyDiv();
        profileSocial.setAttribute("class", "profileSocial forText addFlex");
        data.socialLink.forEach((el) => {
          const span = document.createElement("span");
          const a = document.createElement("a");
          const i = document.createElement("i");
          i.setAttribute("class", el.icon);
          a.href = el.url;
          a.appendChild(i);
          span.appendChild(a);
          profileSocial.appendChild(span);
        });
        profileContent.appendChild(profileSocial);
      }
      const links = onlyDiv();
      if (Object.keys(data.links).length !== 0) {
        let span = document.createElement("span");

        if (addOrNot(data.links.headingName)) {
          span.setAttribute("class", "centerText forText addFlex capitalize");
          span.innerText = data.links.headingName;
        }
        links.setAttribute("class", "links");
        const ul = document.createElement("ul");
        ul.setAttribute("class", "addFlex");
        ul.style.listStyle = "none";
        data.links.linkList.forEach((el) => {
          const li = document.createElement("li");
          li.setAttribute(
            "class",
            el.animationValue !== undefined ? el.animationValue : "none"
          );
          const a = document.createElement("a");

          a.href = el.link;
          a.innerHTML = `
          <div class="linksClass addFlex">
             <div class="icons"><i class="${el.icons}"></i></div>
             <div class="linkText forText">${el.linkName}</div>
             <div class="linkPriority hides">${el.linkPriority}</div>
             <div class="linkTime"><small class="linkCurrent">${getTime(
               el.linkTime
             )}</small></div>
          </div>
          `;
          li.appendChild(a);
          ul.appendChild(li);
        });

        if (span.innerText.length !== 0) links.append(span, ul);
        else links.appendChild(ul);
      }

      const mainMedia = onlyDiv();
      if (Object.keys(data.videoDisplay).length !== 0) {
        mainMedia.setAttribute("class", "mainMedia");
        let span = document.createElement("span");
        if (addOrNot(data.videoDisplay.headingName)) {
          span.setAttribute("class", "centerText forText addFlex capitalize");
          span.innerText = data.videoDisplay.headingName;
        }
        if (span.innerText.length !== 0) mainMedia.appendChild(span);
        let mainContent;
        data.videoDisplay.videoList.forEach((el) => {
          mainContent = onlyDiv();
          mainContent.setAttribute("class", "mainContent addLittleBit");
          if (addOrNot(el.videoName)) {
            const mainText = onlyDiv();
            mainText.setAttribute("class", "mainText");
            const innerText = onlyDiv();
            innerText.setAttribute("class", "innerText forText capitalize");
            innerText.innerText = el.videoName;
            mainText.appendChild(innerText);
            mainContent.appendChild(mainText);
          }
          const xMiniMedia = onlyDiv();
          xMiniMedia.setAttribute("class", "xMiniMedia");
          const divElement = onlyDiv();
          const miniMedia = onlyDiv();
          miniMedia.setAttribute("class", "miniMedia");
          miniMedia.innerHTML = el.iframe;
          divElement.appendChild(miniMedia);
          xMiniMedia.appendChild(divElement);
          mainContent.appendChild(xMiniMedia);
          mainMedia.appendChild(mainContent);
        });
      }
      let collectMail;
      if (data.email) {
        collectMail = onlyDiv();
        collectMail.setAttribute(
          "class",
          "collect_mail addSpace2 addMailCollectOne addMailCollectTwo addFlex"
        );
        collectMail.innerHTML = `
        <div class="form_class">
        <div class="inside_form">
          <div class="text_inside_form">
            <span class="spanText">Subscribe To Our Mailing List</span>
          </div>
          <div class="mail">
            <input
              type="email"
              id="mailName"
              class="mailName"
              required
              placeholder="mail@example.com"
            />
            <button class="btnMail">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
        `;
      }

      box.append(
        profileContent,
        checkWeatherUndefined(links),
        checkWeatherUndefined(mainMedia),
        checkWeatherUndefined(collectMail)
      );
      mainShow.appendChild(box);
      return mainShow;
    }

    function onlyDiv() {
      return document.createElement("div");
    }

    function checkWeatherUndefined(element) {
      return element !== undefined ? element : "";
    }

    function getSvg() {
      return `
      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 212 212"
                      width="212"
                      height="212"
                    >
                      <path
                        fill="currentColor"
                        class="svg-bg"
                        d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"
                      ></path>
                      <path
                        fill="currentColor"
                        class="svg-color"
                        d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"
                      ></path>
                    </svg>
      `;
    }

    function footerCreate(text) {
      const footer = document.createElement("footer");
      footer.setAttribute("class", "mainFooter");
      footer.innerHTML = `
    <div class="footer">
      <p>${text !== "Nil" ? text : ""}</p>
    </div>
    `;
      return footer;
    }

    function addOrNot(text) {
      return text !== "Nil" && text !== undefined && text !== null
        ? true
        : false;
    }

    function getTime(t) {
      if (t === "Nil") return "";
      return t
        .split("/")
        .map((a) => {
          return +a;
        })
        .join("/");
    }

    root.append(createMain(data), footerCreate(data.footer));
    document.title = data.title !== "Nil" ? data.title : "Link";
  }
})();
