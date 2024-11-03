const Components = {
       createContact(contactInfo) {
              const elem = document.createElement("div");
              const id = contactInfo["id"];
              elem.classList.add("contact", `c${id}`);
       
              const idElem = document.createElement("div");
              idElem.textContent = id;
              idElem.id = `id${id}`;
              idElem.classList.add("id");
              elem.appendChild(idElem);
       
              const infoElem = document.createElement("div");
              infoElem.id = `info${id}`;
              infoElem.classList.add("info");
       
              for (let info in contactInfo) {
                     if (info !== "id") {
                            const subInfoElem = document.createElement("div");
                            subInfoElem.id = info + id;
                            subInfoElem.classList.add(info);
                            subInfoElem.textContent = `${info}: ${contactInfo[info]}`;
       
                            infoElem.appendChild(subInfoElem);
                     }
              }
       
              elem.appendChild(infoElem);
              return elem;
       }      
}

export default Components;