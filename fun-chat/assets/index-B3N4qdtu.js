var Z=Object.defineProperty;var K=(n,t,e)=>t in n?Z(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var i=(n,t,e)=>(K(n,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();function L(n){return n!=null}function Y(n,t){return t instanceof n}function x(n){return typeof n=="string"}function y(){return Math.floor(Math.random()*1e4)+1}function R(n){const t=JSON.stringify(n);sessionStorage.setItem("user",t)}function W(){const n=sessionStorage.getItem("user");return n?JSON.parse(n):null}function Q(n){const t=sessionStorage.getItem("user");if(t){const e=JSON.parse(t);e.isLogined=n,R(e)}}function A(){const n=sessionStorage.getItem("user")||"";return JSON.parse(n).id||""}function N(){const n=sessionStorage.getItem("user")||"";return n&&JSON.parse(n).isLogined||!1}function ee(){const n=sessionStorage.getItem("user");let t;return n&&(t=JSON.parse(n).login),t||""}function te(n){const t=new Date(n),e=String(t.getDate()).padStart(2,"0"),s=String(t.getMonth()+1).padStart(2,"0"),a=t.getFullYear(),r=String(t.getHours()).padStart(2,"0"),l=String(t.getMinutes()).padStart(2,"0"),c=String(t.getSeconds()).padStart(2,"0");return`${e}.${s}.${a}, ${r}:${l}:${c}`}function k(n,t){const e=n,s=e.clientHeight,a=window.innerHeight;if(e.scrollHeight<=a)e.scrollTop=e.scrollHeight;else{const r=t.offsetHeight,l=e.scrollHeight-s+r;e.scrollTop=l}}const $=new WeakMap;class o{constructor(t,e){i(this,"nodeElement");i(this,"resizeObserver");const{className:s="",text:a="",id:r=void 0,children:l=[]}=e??{};if(!x(t)&&L(t)&&o.findComponentOf(t))throw new Error(`Component of ${String(t)} already exists`);const c=x(t)?document.createElement(t):t;r&&(c.id=r),l&&this.appendChildren(l),c.className=s,c.textContent=a,this.nodeElement=c,$.set(this.nodeElement,this)}static setStyles(t,e){Object.assign(t.style,{...e})}static findComponentOf(t){const e=$.get(t);if(L(e))return e}appendChild(t){return this.nodeElement.appendChild(t.nodeElement),t}appendChildren(t){return t.forEach(e=>{this.appendChild(e)}),this}get element(){return this.nodeElement}getChildAt(t){return this.getChildren()[t]}getChildren(t){const e=Array.from(this.nodeElement.childNodes).map(s=>o.findComponentOf(s)).filter(s=>L(s));return L(t)?e.filter(s=>Y(t,s)):e}get childrenCount(){return this.nodeElement.childNodes.length}setTextContent(t){return this.nodeElement.textContent=t,this}setAttribute(t,e){return this.nodeElement.setAttribute(t,e),this}removeAttribute(t){this.nodeElement.removeAttribute(t)}toggleClass(t,e){return t&&this.nodeElement.classList.toggle(t,e),this}observe(t){return this.unobserve(),this.resizeObserver=new ResizeObserver(e=>t(e[0])),this.resizeObserver.observe(this.nodeElement),this}unobserve(){return L(this.resizeObserver)&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this}destroy(){this.unobserve(),this.destroyChildren(),this.nodeElement.remove()}destroyChildren(){this.getChildren().forEach(t=>{t.destroy()})}}const se="_footer_yj8b4_2",ie="_footer-container_yj8b4_14",ae="_social-items_yj8b4_23",oe="_social-item_yj8b4_23",ne="_developer_yj8b4_41",re="_social-item-link_yj8b4_41",le="_rs-icon-wrap_yj8b4_58",de="_rsschool-link_yj8b4_66",d={footer:se,"footer-container":"_footer-container_yj8b4_14",footerContainer:ie,"social-items":"_social-items_yj8b4_23",socialItems:ae,"social-item":"_social-item_yj8b4_23",socialItem:oe,developer:ne,"social-item-link":"_social-item-link_yj8b4_41",socialItemLink:re,"rs-icon-wrap":"_rs-icon-wrap_yj8b4_58",rsIconWrap:le,"rsschool-link":"_rsschool-link_yj8b4_66",rsschoolLink:de};class ce extends o{constructor(){super("footer",{className:`${d.footer}`}),this.render()}render(){this.element.innerHTML=`
    <div class="${d.footerContainer}">
      <ul class="${d.socialItems} ${d.developer}">
        <li class="${d.socialItem}">
          <a class="${d.socialItemLink}" href="https://github.com/Tetiana-KET" target="_blank">
            Tetiana
          </a>
        </li>
        <li class="${d.socialItem}">
          <a class="${d.socialItemLink}" href="https://github.com/Tetiana-KET" target="_blank">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="github" width="1em" height="1em" fill="#ffffff" aria-hidden="true"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>
          </a>
        </li>
      </ul>
      <div class="${d.rsIconWrap} ${d.rsIconWrap}">
        <a href="https://rs.school/" class="${d.socialItem} ${d.rsschoolLink}" target="_blank">
        </a>
      </div>
      <ul class="${d.socialItems} ${d.rsSchool}">
        <li class="${d.socialItem} ${d.socialYear}">
          2024
        </li>
        <li class="${d.socialItem}">
          <a class="${d.socialItemLink}" href="https://www.youtube.com/c/rollingscopesschool" target="_blank">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="youtube" width="1em" height="1em" fill="#ffffff" aria-hidden="true"><path d="M941.3 296.1a112.3 112.3 0 00-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0082.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z"></path></svg>
          </a>
        </li>
        <li class="${d.socialItem}">
          <a class="${d.socialItemLink}" href="https://discord.com/invite/PRADsJB" target="_blank">
            <svg width="1em" height="1em" fill="#ffffff" viewBox="0 -7 71 71" xmlns="http://www.w3.org/2000/svg"><g><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"></path></g></svg>
          </a>
        </li>
      </ul>
    </div>`}}class b{constructor(){i(this,"listeners",{})}subscribe(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)}emit(t,e){const s=this.listeners[t];s&&s.forEach(a=>a(e))}}const g=new b,U=new b,P=new b,q=new b,G=new b,V=new b,J=new b,j=new b,z=new b,X=new b,he="_header-logo_1pfov_1",ue="_header_1pfov_1",ge="_header-container_1pfov_31",me="_buttons-wrap_1pfov_49",pe="_button_1pfov_49",_e="_user-info_1pfov_97",be="_fadeInDown_1pfov_1",w={"header-logo":"_header-logo_1pfov_1",headerLogo:he,header:ue,"header-container":"_header-container_1pfov_31",headerContainer:ge,"buttons-wrap":"_buttons-wrap_1pfov_49",buttonsWrap:me,button:pe,"user-info":"_user-info_1pfov_97",userInfo:_e,fadeInDown:be};class fe extends o{constructor(e){super("header",{className:`${w.header}`,id:"header"});i(this,"headerContainer");i(this,"headerLogo");i(this,"buttonsWrap");i(this,"infoButton");i(this,"logOutButton");i(this,"userInfo");i(this,"userName",null);i(this,"webSocketAPI");this.webSocketAPI=e,this.headerContainer=new o("div",{className:`${w.headerContainer}`,id:"headerContainer"}),this.appendChild(this.headerContainer),this.headerLogo=new o("h2",{className:`${w.headerLogo}`,text:"Fun Chat"}),this.userInfo=new o("div",{className:`${w.userInfo}`,id:"userInfo"}),this.buttonsWrap=new o("div",{className:`${w.buttonsWrap}`}),this.infoButton=new o("button",{className:`${w.button}`,text:"About",id:"infoButton"}).setAttribute("type","button"),this.logOutButton=new o("button",{className:`${w.button}`,text:"Log out",id:"logOutButton"}).setAttribute("type","button").setAttribute("disabled",""),this.buttonsWrap.appendChildren([this.infoButton,this.logOutButton]),this.headerContainer.appendChildren([this.headerLogo,this.userInfo,this.buttonsWrap]),this.infoButton.element.addEventListener("click",this.onAboutBtnClick.bind(this)),this.logOutButton.element.addEventListener("click",this.onLogoutBtnClick.bind(this)),g.subscribe("aboutBtnClicked",this.disableAboutBtn.bind(this)),g.subscribe("successLogin",this.handleSuccessLogin.bind(this)),g.subscribe("backButtonClicked",this.enableAboutBtn.bind(this)),this.checkIsUserLogged()}setUserNameInHeader(){const e=sessionStorage.getItem("user");if(e){const s=JSON.parse(e);this.userName=s.login,this.userInfo.element.textContent=`${this.userName}`}}checkIsUserLogged(){N()?this.enableLogoutBtn():this.disableLogoutBtn()}onAboutBtnClick(e){window.location.hash="#about",g.emit("aboutBtnClicked",e)}onLogoutBtnClick(){this.userInfo.element.textContent="",this.disableLogoutBtn();let e,s;const a=sessionStorage.getItem("user");if(a){const r=JSON.parse(a);e=r.login,s=r.password}e&&s&&this.webSocketAPI.userLogout(e,s)}disableAboutBtn(){this.infoButton.element.setAttribute("disabled","")}enableAboutBtn(){this.infoButton.element.removeAttribute("disabled")}enableLogoutBtn(){this.logOutButton.element.removeAttribute("disabled")}disableLogoutBtn(){this.logOutButton.element.setAttribute("disabled","")}handleSuccessLogin(){this.setUserNameInHeader(),this.enableLogoutBtn()}}const we="_about-page_l5qig_1",Se="_about-page_wrapper_l5qig_7",Ce="_about-page_title_l5qig_19",Le="_about-page_description_l5qig_21",Ie="_about-page_button_l5qig_24",ye="_about-page_developer_l5qig_34",C={"about-page":"_about-page_l5qig_1",aboutPage:we,"about-page_wrapper":"_about-page_wrapper_l5qig_7",aboutPageWrapper:Se,"about-page_title":"_about-page_title_l5qig_19",aboutPageTitle:Ce,"about-page_description":"_about-page_description_l5qig_21",aboutPageDescription:Le,"about-page_button":"_about-page_button_l5qig_24",aboutPageButton:Ie,"about-page_developer":"_about-page_developer_l5qig_34",aboutPageDeveloper:ye};class F extends o{constructor(){super("section",{className:`${C.aboutPage}`,id:"aboutPage"});i(this,"aboutPageWrapper");i(this,"aboutPageTitle");i(this,"aboutPageDescription");i(this,"aboutPageBackButton");i(this,"aboutPageDeveloper");this.aboutPageWrapper=new o("div",{className:`${C.aboutPageWrapper}`,id:"aboutPageWrapper"}),this.aboutPageTitle=new o("h2",{className:`${C.aboutPageTitle}`,text:"Welcome to Fun Chat"}),this.aboutPageDescription=new o("p",{className:`${C.aboutPageDescription}`}),this.aboutPageBackButton=new o("button",{className:`${C.aboutPageButton}`,text:"Back",id:"aboutPageButton"}).setAttribute("type","button"),this.aboutPageDeveloper=new o("a",{className:`${C.aboutPageDeveloper}`,id:"loginForm"}),this.setAboutPageDescription(),this.setPageElements(),this.setDeveloperProperties(),this.appendChild(this.aboutPageWrapper),this.aboutPageBackButton.element.addEventListener("click",this.onBackButtonClick.bind(this))}setAboutPageDescription(){this.aboutPageDescription.element.textContent=`An interactive chat application developed as part of the RSSchool JS/FE 2023Q4 course. 
      Fun Chat provides users with a platform to engage in real-time communication through text messages.
      Key Features:
      Real-time Messaging: Engage in real-time conversations with other users.
      User Authentication: Securely log in to access the chat platform.
      Responsive Design: Enjoy a seamless experience across various devices and screen sizes.

      Experience the joy of real-time communication and connect with friends and colleagues in Fun Chat. Start chatting now and discover a new way to stay connected!`}setPageElements(){this.aboutPageWrapper.appendChildren([this.aboutPageTitle,this.aboutPageDescription,this.aboutPageDeveloper,this.aboutPageBackButton])}setDeveloperProperties(){this.aboutPageDeveloper.setAttribute("href","https://github.com/Tetiana-KET").setAttribute("target","_blank").setTextContent("Tetiana-KET")}onBackButtonClick(e){window.history.go(-1),g.emit("backButtonClicked",e)}}const ve="_user-line_cnkx8_1",Ue="_user-line_name_cnkx8_8",Pe="_user-line_status_cnkx8_13",Ee="_user-line_Counter_cnkx8_25",v={"user-line":"_user-line_cnkx8_1",userLine:ve,"user-line_name":"_user-line_name_cnkx8_8",userLineName:Ue,"user-line_status":"_user-line_status_cnkx8_13",userLineStatus:Pe,"user-line_Counter":"_user-line_Counter_cnkx8_25",userLineCounter:Ee};class H extends o{constructor(e,s){super("li",{className:`${v.userLine}`});i(this,"userLineName");i(this,"userLineStatus");i(this,"userLineCounter");this.setAttribute("id",`${e}`),this.userLineName=new o("span",{className:`${v.userLineName}`,id:`userLineName_${e}`}).setTextContent(`${e}`),this.userLineStatus=new o("span",{className:`${v.userLineStatus}`,id:`userLineStatus_${e}`}).setAttribute("data-status",`${s}`),this.userLineCounter=new o("span",{className:`${v.userLineCounter}`,id:`userLineCounter_${e}`}),this.appendChildren([this.userLineStatus,this.userLineName,this.userLineCounter])}}const Ae="_chat-page_1twet_1",Be="_chat-page_aside_1twet_17",Ne="_chat-page_dialog_1twet_39",Te="_aside_contact-search_1twet_61",Me="_dialog-input_1twet_63",xe="_aside_users-list_1twet_87",ke="_aside_user-line_1twet_107",$e="_dialog-header_1twet_115",Fe="_dialog-header_user-name_1twet_135",He="_dialog-header_user-status_1twet_147",Oe="_dialog-body_1twet_155",De="_dialog-body_text_1twet_177",Re="_dialog-form_1twet_197",We="_dialog-form-button_1twet_225",u={"chat-page":"_chat-page_1twet_1",chatPage:Ae,"chat-page_aside":"_chat-page_aside_1twet_17",chatPageAside:Be,"chat-page_dialog":"_chat-page_dialog_1twet_39",chatPageDialog:Ne,"aside_contact-search":"_aside_contact-search_1twet_61",asideContactSearch:Te,"dialog-input":"_dialog-input_1twet_63",dialogInput:Me,"aside_users-list":"_aside_users-list_1twet_87",asideUsersList:xe,"aside_user-line":"_aside_user-line_1twet_107",asideUserLine:ke,"dialog-header":"_dialog-header_1twet_115",dialogHeader:$e,"dialog-header_user-name":"_dialog-header_user-name_1twet_135",dialogHeaderUserName:Fe,"dialog-header_user-status":"_dialog-header_user-status_1twet_147",dialogHeaderUserStatus:He,"dialog-body":"_dialog-body_1twet_155",dialogBody:Oe,"dialog-body_text":"_dialog-body_text_1twet_177",dialogBodyText:De,"dialog-form":"_dialog-form_1twet_197",dialogForm:Re,"dialog-form-button":"_dialog-form-button_1twet_225",dialogFormButton:We};class O extends o{constructor(){super("section",{className:`${u.chatPage}`,id:"chatPage"});i(this,"aside");i(this,"contactSearch");i(this,"usersList");i(this,"dialogContainer");i(this,"dialogHeader");i(this,"dialogHeaderUserName");i(this,"dialogHeaderUserStatus");i(this,"dialogBody");i(this,"dialogBodyText");i(this,"dialogForm");i(this,"dialogInput");i(this,"dialogFormButton");this.aside=new o("aside",{className:`${u.chatPageAside}`,id:"chatPageAside"}),this.contactSearch=new o("input",{className:`${u.asideContactSearch}`,id:"asideContactSearch"}),this.usersList=new o("ul",{className:`${u.asideUsersList}`,id:"asideUsersList"}),this.dialogContainer=new o("article",{className:`${u.chatPageDialog}`,id:"chatPageDialog"}),this.dialogHeader=new o("h3",{className:`${u.dialogHeader}`,id:"dialogHeader"}),this.dialogHeaderUserName=new o("span",{className:`${u.dialogHeaderUserName}`,id:"dialogUserName"}),this.dialogHeaderUserStatus=new o("span",{className:`${u.dialogHeaderUserStatus}`,id:"dialogUserStatus"}),this.dialogBody=new o("div",{className:`${u.dialogBody}`,id:"dialogBody"}),this.dialogBodyText=new o("span",{className:`${u.dialogBodyText}`,id:"dialogBodyText"}),this.dialogForm=new o("form",{className:`${u.dialogForm}`,id:"dialogForm"}),this.dialogInput=new o("input",{className:`${u.dialogInput}`,id:"dialogInput"}),this.dialogFormButton=new o("button",{className:`${u.dialogFormButton}`,text:"Send",id:"dialogFormButton"}),this.handleSearchInputChange(),this.handleSelectUserToChatWith(),this.constructPage(),this.handleDialogueInputChange(),this.dialogForm.element.addEventListener("submit",this.onFormSubmit.bind(this))}handleSearchInputChange(){this.contactSearch.element.addEventListener("input",()=>{const e=this.contactSearch.element.value.trim();G.emit("searchInputChanged",e)})}handleDialogueInputChange(){this.dialogInput.element.addEventListener("input",()=>{this.dialogInput.element.value?this.dialogFormButton.element.removeAttribute("disabled"):this.dialogFormButton.element.setAttribute("disabled","")})}onFormSubmit(e){e.preventDefault();const s=this.dialogInput.element.value;this.dialogInput.element.value="",this.dialogFormButton.element.setAttribute("disabled",""),J.emit("eventMessageSent",s)}handleSelectUserToChatWith(){this.usersList.element.addEventListener("click",e=>{if(e.target instanceof HTMLElement){const s=e.target.closest("li");if(s){const a=s.getAttribute("id")||"";V.emit("userToChatWithSelected",a),this.displaySelectedUserInDialogue(a)}}})}displaySelectedUserInDialogue(e){var r,l;const s=(r=document.getElementById(`userLineName_${e}`))==null?void 0:r.innerText,a=(l=document.getElementById(`userLineStatus_${e}`))==null?void 0:l.getAttribute("data-status");s&&a&&this.setUserInfoToGialogHeader(s,a)}setUserInfoToGialogHeader(e,s){this.dialogHeaderUserName.element.textContent=e,this.dialogHeaderUserStatus.element.textContent=s==="true"?"Online":"Offline"}constructPage(){this.dialogFormButton.setAttribute("disabled","").setAttribute("type","submit"),this.dialogInput.setAttribute("placeholder","Enter your message...").setAttribute("disabled",""),this.contactSearch.setAttribute("placeholder","Search..."),this.aside.appendChildren([this.contactSearch,this.usersList]),this.dialogHeader.appendChildren([this.dialogHeaderUserName,this.dialogHeaderUserStatus]),this.dialogForm.appendChildren([this.dialogInput,this.dialogFormButton]),this.dialogBody.appendChild(this.dialogBodyText),this.dialogContainer.appendChildren([this.dialogHeader,this.dialogBody,this.dialogForm]),this.appendChildren([this.aside,this.dialogContainer]),this.renderDialogBodyText()}renderDialogBodyText(e="default",s=this.dialogBodyText.element){const a=s;let r;switch(e){case"userSelected":r="Enter your first message...";break;case"dialogStarted":r="";break;default:r="Select a user to send a message...";break}a.innerText=`${r}`}renderUsers(e,s,a){console.log("messageMap",a),e.forEach(r=>{const l=r.login,c=r.isLogined||!1,m=new H(l,c);a&&Object.entries(a).length!==0&&Object.entries(a).forEach(([p,_])=>{p===l&&(m.userLineCounter.element.textContent=`${_.length}`,m.userLineCounter.setAttribute("data-visible","true"))}),s.append(m.element)})}drawNewLoggedUser(e,s){const a=e.login,r=e.isLogined||!1;if(r===!0){console.log("draw user",e);const l=new H(a,r);s.prepend(l.element)}}displayUpdatedStatus(e){const s=e.login,a=e.isLogined||!1,r=document.getElementById(`userLineStatus_${s}`);r&&r.setAttribute("data-status",`${a}`)}updateStatusInDialogueHeader(e){const s=e.isLogined||!1,a=document.getElementById("dialogUserStatus");a&&(a.innerText=s?"online":"offline")}updateMessageStatus(){}}class qe{constructor(t){i(this,"webSocketAPI");this.webSocketAPI=t}validateUserName(t){return/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z_-]*\d?[a-zA-Z_-]*$/.test(t)&&t.length>=4}validatePassword(t){return/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\\da-zA-Z]).{8,}$/.test(t)&&t.length>=8}handleFormSubmit(t){this.webSocketAPI.userAuthentication(t)}}const Ge="_login-page_1lwrq_1",Ve="_login-form-wrapper_1lwrq_4",Je="_login-form_1lwrq_4",je="_login-form-title_1lwrq_34",ze="_login-form-input_1lwrq_43",Xe="_last-name-input_1lwrq_57",Ze="_login-form-label_1lwrq_61",Ke="_input-tooltip_1lwrq_75",Ye="_input-tooltip-active_1lwrq_103",Qe="_form-button_1lwrq_108",et="_error-message_1lwrq_115",h={"login-page":"_login-page_1lwrq_1",loginPage:Ge,"login-form-wrapper":"_login-form-wrapper_1lwrq_4",loginFormWrapper:Ve,"login-form":"_login-form_1lwrq_4",loginForm:Je,"login-form-title":"_login-form-title_1lwrq_34",loginFormTitle:je,"login-form-input":"_login-form-input_1lwrq_43",loginFormInput:ze,"last-name-input":"_last-name-input_1lwrq_57",lastNameInput:Xe,"login-form-label":"_login-form-label_1lwrq_61",loginFormLabel:Ze,"input-tooltip":"_input-tooltip_1lwrq_75",inputTooltip:Ke,"input-tooltip-active":"_input-tooltip-active_1lwrq_103",inputTooltipActive:Ye,"form-button":"_form-button_1lwrq_108",formButton:Qe,"error-message":"_error-message_1lwrq_115",errorMessage:et};class D extends o{constructor(e){super("section",{className:`${h.loginPage}`,id:"loginPage"});i(this,"controller");i(this,"form");i(this,"passwordInput");i(this,"loginInput");i(this,"loginButton");i(this,"infoButton");i(this,"loginLabel");i(this,"passwordLabel");i(this,"loginTooltip");i(this,"passwordTooltip");i(this,"formTitle");i(this,"errorMessage");i(this,"isLoginValid",!1);i(this,"isPasswordValid",!1);i(this,"webSocketAPI");this.webSocketAPI=e,this.controller=new qe(this.webSocketAPI),this.form=new o("form",{className:`${h.loginForm}`,id:"loginForm"}),this.formTitle=new o("h2",{className:`${h.loginFormTitle}`,text:"login",id:"loginForm"}),this.loginTooltip=new o("span",{text:"Use both upper and lower case English letters"}),this.passwordTooltip=new o("span",{text:"Requires upper and lower case letters and digits"}),this.loginInput=new o("input",{id:"loginInput",className:h.loginFormInput}),this.passwordInput=new o("input",{id:"passwordInput",className:h.loginFormInput}),this.loginLabel=new o("label",{text:"Login",className:h.loginFormLabel}),this.passwordLabel=new o("label",{text:"Password",className:h.loginFormLabel}),this.loginButton=new o("button",{className:h.formButton,text:"Log in",id:"loginBtn"}).setAttribute("type","submit").setAttribute("disabled","true"),this.infoButton=new o("button",{className:h.formButton,text:"About",id:"infoButton"}).setAttribute("type","button"),this.errorMessage=new o("p",{className:h.errorMessage}),this.setFormElements(),this.setEventListenerToForm(),this.setInputsProperties(),this.appendChild(this.form),g.subscribe("authError",s=>{this.drawErrorMessage(s)}),g.subscribe("aboutBtnClicked",this.disableBtn.bind(this)),g.subscribe("backButtonClicked",this.enableBtn.bind(this)),this.infoButton.element.addEventListener("click",this.onAboutBtnClick.bind(this))}setEventListenerToForm(){this.loginInput.element.addEventListener("input",this.inputLoginOnChange.bind(this)),this.passwordInput.element.addEventListener("input",this.inputPasswordOnChange.bind(this)),this.form.element.addEventListener("submit",e=>{e.preventDefault(),this.onFormSubmit()})}onAboutBtnClick(e){window.location.hash="#about",g.emit("aboutBtnClicked",e)}disableBtn(){this.infoButton.element.disabled=!0}enableBtn(){this.infoButton.element.disabled=!1}setInputsProperties(){this.passwordTooltip.element.classList.add(h.inputTooltip,h.inputTooltipPassword),this.loginTooltip.element.classList.add(h.inputTooltip,h.inputTooltipName),this.loginInput.setAttribute("type","text").setAttribute("required","true").setAttribute("name","loginForm").setAttribute("placeholder",'min length 4 chars, "-" and "_" allowed').setAttribute("minlength","4"),this.passwordInput.setAttribute("type","password").setAttribute("required","true").setAttribute("name","loginForm").setAttribute("placeholder","Password, min length 6 symbols").setAttribute("minlength","8")}setFormElements(){this.loginLabel.appendChild(this.loginTooltip),this.passwordLabel.appendChild(this.passwordTooltip),this.form.appendChildren([this.formTitle,this.loginLabel,this.loginInput,this.passwordLabel,this.passwordInput,this.loginButton,this.infoButton])}inputLoginOnChange(){const e=this.loginInput.element.value.trim();return this.isLoginValid=this.controller.validateUserName(e),this.loginButton.element.disabled=!this.loginBtnIsDisabled(),this.loginTooltip.element.style.opacity=this.isLoginValid?"0":"1",this.loginTooltip.element.style.visibility=this.isLoginValid?"hidden":"visible",this.isLoginValid}inputPasswordOnChange(){const e=this.passwordInput.element.value.trim();return this.isPasswordValid=this.controller.validatePassword(e),this.loginButton.element.disabled=!this.loginBtnIsDisabled(),this.passwordTooltip.element.style.opacity=this.isPasswordValid?"0":"1",this.passwordTooltip.element.style.visibility=this.isPasswordValid?"hidden":"visible",this.isPasswordValid}loginBtnIsDisabled(){return this.isPasswordValid&&this.isLoginValid}onFormSubmit(){const e={login:this.getLogin(),password:this.getPassword()};this.controller.handleFormSubmit(e)}getLogin(){return this.loginInput.element.value}getPassword(){return this.passwordInput.element.value}drawErrorMessage(e){this.errorMessage.element.textContent=`${e}`,this.form.appendChild(this.errorMessage),setTimeout(()=>{this.errorMessage.destroy(),this.passwordInput.element.value=""},2e3)}}function tt(n){return"".includes(n)?"":"#chat".includes(n)?"#chat":"#about".includes(n)?"#about":""}class st{constructor(t){i(this,"setPage");i(this,"currentPage");this.currentPage="",this.setPage=t,window.onhashchange=()=>{this.handleLocation()},window.onload=()=>{this.handleLocation()}}handleLocation(){const t=window.location.hash;this.currentPage=tt(t),this.setPage(this.currentPage)}}const it="_main_mnmne_1",at={main:it},ot="_message-container_fh42b_1",nt="_message-content_fh42b_6",rt="_message-header_fh42b_26",lt="_message-header_user_fh42b_38",dt="_message-header_date_fh42b_40",ct="_message-text_fh42b_43",ht="_message-footer_fh42b_50",ut="_message-footer_status_fh42b_62",f={"message-container":"_message-container_fh42b_1",messageContainer:ot,"message-content":"_message-content_fh42b_6",messageContent:nt,"message-header":"_message-header_fh42b_26",messageHeader:rt,"message-header_user":"_message-header_user_fh42b_38",messageHeaderUser:lt,"message-header_date":"_message-header_date_fh42b_40",messageHeaderDate:dt,"message-text":"_message-text_fh42b_43",messageText:ct,"message-footer":"_message-footer_fh42b_50",messageFooter:ht,"message-footer_status":"_message-footer_status_fh42b_62",messageFooterStatus:ut};class B extends o{constructor(){super("div",{className:`${f.messageContainer}`});i(this,"messageContent");i(this,"messageHeader");i(this,"messageHeaderUser");i(this,"messageHeaderDate");i(this,"messageText");i(this,"messageFooter");i(this,"messageFooterStatus");this.messageContent=new o("div",{className:`${f.messageContent}`,id:"messageContent"}),this.messageHeader=new o("div",{className:`${f.messageHeader}`,id:"messageHeader"}),this.messageHeaderDate=new o("label",{className:`${f.messageHeaderDate}`,id:"messageHeaderDate"}),this.messageHeaderUser=new o("label",{className:`${f.messageHeaderUser}`,id:"messageHeaderUser"}),this.messageText=new o("div",{className:`${f.messageText}`,id:"messageText"}),this.messageFooter=new o("div",{className:`${f.messageFooter}`,id:"messageFooter"}),this.messageFooterStatus=new o("label",{className:`${f.messageFooterStatus}`,id:"messageFooterStatus"}),this.buildMessageElement()}buildMessageElement(){this.messageHeader.appendChildren([this.messageHeaderUser,this.messageHeaderDate]),this.messageFooter.appendChild(this.messageFooterStatus),this.messageContent.appendChildren([this.messageHeader,this.messageText,this.messageFooter]),this.appendChild(this.messageContent)}setMessageData(e){const{message:s,datetime:a,status:r,from:l,attributeValue:c}=e;this.messageText.element.innerText=s,this.messageHeaderDate.element.innerText=te(a),this.messageFooterStatus.element.innerText=r?"delivered":"sent",this.messageHeaderUser.element.innerText=l,this.messageContent.setAttribute("data-user",`${c}`),this.messageFooterStatus.setAttribute("data-user","sensing-status"),this.setAttribute("id",`${a}`)}}class gt{constructor(){i(this,"activeUsers",[]);i(this,"inactiveUsers",[]);i(this,"allUsers",[]);i(this,"currentUser",null);i(this,"recipient","");i(this,"mode","default");i(this,"messages",{})}setStatus(t){return this.activeUsers.some(e=>e.login===t)}addMessageToStore(t,e){this.messages[t]||(this.messages[t]=[]),this.messages[t].push(e)}updateActiveUsers(t){this.activeUsers=t.filter(e=>{var s;return e.login!==((s=this.currentUser)==null?void 0:s.login)})}updateInactiveUsers(t){this.inactiveUsers=t}setCurrentUser(t){this.currentUser=t}updateUserStatusArrays(t){const e=this.activeUsers.findIndex(a=>a.login===t.login),s=this.inactiveUsers.findIndex(a=>a.login===t.login);e!==-1?(this.activeUsers[e].isLogined=t.isLogined,this.inactiveUsers.push(...this.activeUsers.splice(e,1))):s!==-1?(this.inactiveUsers[s].isLogined=t.isLogined,this.activeUsers.push(...this.inactiveUsers.splice(s,1))):e===-1&&s===-1&&q.emit("newUserAuth",t)}searchUser(t,e){const s=document.getElementById("asideUsersList"),r=[...this.activeUsers,...this.inactiveUsers].filter(l=>l.login.toLowerCase().includes(t.toLowerCase()));s&&(s.innerHTML="",e(r,s))}}class mt{constructor(t,e){i(this,"chatModel");i(this,"webSocketAPI");i(this,"chatPage");i(this,"messageMap");this.webSocketAPI=t,this.chatPage=e,this.chatModel=new gt,this.messageMap={},this.addSubscriptions()}addSubscriptions(){U.subscribe("USER_ACTIVE_data",t=>{this.chatModel.updateActiveUsers(t.payload.users);const e=document.getElementById("asideUsersList");e&&this.chatPage.renderUsers(this.chatModel.activeUsers,e,this.messageMap)}),U.subscribe("USER_INACTIVE_data",t=>{this.chatModel.updateInactiveUsers(t.payload.users);const e=document.getElementById("asideUsersList");e&&this.chatPage.renderUsers(this.chatModel.inactiveUsers,e,this.messageMap)}),P.subscribe("USER_EXTERNAL_LOGIN",this.handleUSER_EXTERNAL_LOG_IN_OUT.bind(this)),P.subscribe("USER_EXTERNAL_LOGOUT",this.handleUSER_EXTERNAL_LOG_IN_OUT.bind(this)),q.subscribe("newUserAuth",this.callDrawNewUser.bind(this)),g.subscribe("successLogin",this.setCurUser.bind(this)),G.subscribe("searchInputChanged",this.callSearchHandler.bind(this)),V.subscribe("userToChatWithSelected",this.userToChatWithSelectedHandler.bind(this)),J.subscribe("eventMessageSent",this.messageSentHandler.bind(this)),j.subscribe("MSG_SEND",this.messageSentFromServerHandler.bind(this)),z.subscribe("MSG_FROM_USER_Fetched",this.historyFetchedHandler.bind(this)),X.subscribe("MSG_READ",this.messageReadHandler.bind(this))}messageReadHandler(t){console.log(t)}handleUSER_EXTERNAL_LOG_IN_OUT(t){const{user:e}=t.payload;e&&(this.chatPage.displayUpdatedStatus(e),this.chatModel.updateUserStatusArrays(e)),e&&this.chatModel.recipient===e.login&&this.chatPage.updateStatusInDialogueHeader(e),t.type==="USER_EXTERNAL_LOGIN"&&Array.from(document.querySelectorAll('label[data-user="sensing-status"]')).forEach(s=>{const a=s;a.textContent="delivered"})}messageSentFromServerHandler(t){var _,I;const{datetime:e,text:s,from:a,to:r}=t.payload.message,l=t.payload.message.status.isDelivered,c=(_=document.getElementById("dialogUserName"))==null?void 0:_.innerText,m=s,p=document.getElementById("dialogBody");if(p&&this.chatModel.mode==="dialogStarted"&&((I=this.chatModel.currentUser)==null?void 0:I.login)===r&&c===r){const E={datetime:e,message:m,from:a,attributeValue:"recipient",status:l},S=new B;S.setMessageData(E),p.append(S.element),k(p,S.element)}}messageSentHandler(t){var p;const e=document.getElementById("dialogBodyText");this.chatModel.mode="dialogStarted",e&&this.chatPage.renderDialogBodyText(this.chatModel.mode,e);const s=document.getElementById("dialogBody"),a=new Date().getTime();console.log(a);const r=((p=document.getElementById("dialogUserName"))==null?void 0:p.textContent)||"",l=this.chatModel.setStatus(r),c={datetime:a,status:l,message:t,from:"You",attributeValue:"current"},m=new B;m.setMessageData(c),s&&this.chatModel.mode==="dialogStarted"&&(s.append(m.element),k(s,m.element)),this.webSocketAPI.sendMessage(t,this.chatModel.recipient)}historyFetchedHandler(t){const{length:e}=t.payload.messages,{messages:s}=t.payload,a=document.getElementById("dialogBody");if(a&&(a.innerHTML=""),e){this.chatModel.mode="dialogStarted";const r=document.getElementById("dialogBodyText");r&&this.chatPage.renderDialogBodyText(this.chatModel.mode,r),s.forEach(l=>{var T,M;const{datetime:c}=l,m=l.status.isDelivered||!1,p=l.text;let{from:_}=l;const I=((T=this.chatModel.currentUser)==null?void 0:T.login)===_?"current":"recipient";_=((M=this.chatModel.currentUser)==null?void 0:M.login)===_?"You":_;const E={datetime:c,status:m,message:p,from:_,attributeValue:I},S=new B;S.setMessageData(E),a&&a.append(S.element)})}}userToChatWithSelectedHandler(t){this.chatModel.recipient=t;const e=document.getElementById("dialogBodyText"),s=document.getElementById("dialogInput");this.chatModel.mode="userSelected",this.webSocketAPI.fetchMessageHistoryWithUser(t),e&&this.chatPage.renderDialogBodyText(this.chatModel.mode,e),s&&s.removeAttribute("disabled")}callSearchHandler(t){this.chatModel.searchUser(t,this.chatPage.renderUsers)}callDrawNewUser(t){var e;if(t.login!==((e=this.chatModel.currentUser)==null?void 0:e.login)){const s=document.getElementById("asideUsersList");if(this.chatModel.activeUsers.includes(t)&&this.chatModel.inactiveUsers.includes(t))return;s&&this.chatPage.drawNewLoggedUser(t,s)}}setUnreadMessages(){this.chatModel.activeUsers.forEach(t=>{this.webSocketAPI.fetchMessageHistoryWithUser(t.login)}),this.chatModel.inactiveUsers.forEach(t=>{this.webSocketAPI.fetchMessageHistoryWithUser(t.login)})}setCurUser(){const t=W();t&&(this.chatModel.setCurrentUser(t),this.setUnreadMessages())}start(){this.setCurUser(),this.webSocketAPI.start()}}class pt extends o{constructor(e){super("main",{className:`${at.main}`,id:"main"});i(this,"router");i(this,"loginPage");i(this,"aboutPage");i(this,"chatPage");i(this,"webSocketAPI");i(this,"chatController");this.webSocketAPI=e,this.loginPage=new D(this.webSocketAPI),this.aboutPage=new F,this.chatPage=new O,this.chatController=new mt(this.webSocketAPI,this.chatPage),this.appendChild(this.loginPage),this.router=new st(this.setPageContent.bind(this)),console.log(this.router),window.addEventListener("unload",()=>{this.setPageContent()}),this.chatController.start()}setPageContent(){const e=window.location.hash;if(N()||e==="#chat"&&(window.location.hash=""),N()){const s=document.getElementById("userInfo"),a=W();s&&(s.textContent=`${ee()}`),a&&this.reLogUser(a)}e===""?this.drawLoginPage():e==="#chat"?this.drawChatPage():e==="#about"&&this.drawAboutPage()}reLogUser(e){const s={id:e.id||"",type:"USER_LOGIN",payload:{user:{login:e.login,password:e.password}}};this.webSocketAPI.ws.readyState===WebSocket.OPEN?this.webSocketAPI.ws.send(JSON.stringify(s)):this.webSocketAPI.ws.addEventListener("open",()=>{this.webSocketAPI.ws.send(JSON.stringify(s))})}drawAboutPage(){this.destroyChildren(),this.aboutPage=new F,this.appendChild(this.aboutPage)}drawChatPage(){this.destroyChildren(),this.chatPage=new O,this.appendChild(this.chatPage),this.webSocketAPI.ws.readyState===WebSocket.OPEN?(this.webSocketAPI.getAllAuthenticatedUsers(),this.webSocketAPI.getAllUnauthorizedUsers()):this.webSocketAPI.ws.addEventListener("open",()=>{this.webSocketAPI.getAllAuthenticatedUsers(),this.webSocketAPI.getAllUnauthorizedUsers()})}drawLoginPage(){this.destroyChildren(),this.loginPage=new D(this.webSocketAPI),this.appendChild(this.loginPage)}}class _t{constructor(){i(this,"ws");i(this,"errorMessage","");this.ws=new WebSocket("ws://127.0.0.1:4000")}userAuthentication(t){const e={id:y().toString(),type:"USER_LOGIN",payload:{user:t}};this.ws.readyState===WebSocket.OPEN?this.ws.send(JSON.stringify(e)):this.ws.addEventListener("open",()=>{this.ws.send(JSON.stringify(e))});const s={login:e.payload.user.login,password:e.payload.user.password,isLogined:!1,id:e.id};R(s)}userLogout(t,e){const s={id:A(),type:"USER_LOGOUT",payload:{user:{login:t,password:e}}};this.ws.send(JSON.stringify(s))}sendMessage(t,e){const s={id:A(),type:"MSG_SEND",payload:{message:{to:e,text:t}}};this.ws.send(JSON.stringify(s))}fetchMessageHistoryWithUser(t){const e={id:A(),type:"MSG_FROM_USER",payload:{user:{login:`${t}`}}};this.ws.send(JSON.stringify(e))}getAllAuthenticatedUsers(){const t={id:y().toString(),type:"USER_ACTIVE",payload:null};this.ws.send(JSON.stringify(t))}getAllUnauthorizedUsers(){const t={id:y().toString(),type:"USER_INACTIVE",payload:null};this.ws.send(JSON.stringify(t))}MessageReadStatusChange(t){const e={id:y().toString(),type:"MSG_READ",payload:{message:{id:t}}};this.ws.send(JSON.stringify(e))}handleMessage(t){const e=JSON.parse(t.data);if(e.type==="ERROR"&&(this.errorMessage=e.payload.error,g.emit("authError",e.payload.error)),e.type==="USER_LOGIN"){g.emit("successLogin",e),window.location.hash="#chat";const{isLogined:s}=e.payload.user;Q(s)}e.type==="USER_LOGOUT"&&(sessionStorage.clear(),window.location.hash="",g.emit("userLoggedOut",e)),e.type==="USER_ACTIVE"&&U.emit("USER_ACTIVE_data",e),e.type==="USER_INACTIVE"&&U.emit("USER_INACTIVE_data",e),e.type==="USER_EXTERNAL_LOGIN"&&P.emit("USER_EXTERNAL_LOGIN",e),e.type==="USER_EXTERNAL_LOGOUT"&&P.emit("USER_EXTERNAL_LOGOUT",e),e.type==="MSG_SEND"&&j.emit("MSG_SEND",e),e.type==="MSG_FROM_USER"&&z.emit("MSG_FROM_USER_Fetched",e),e.type==="MSG_READ"&&X.emit("MSG_READ",e)}start(){this.ws.addEventListener("message",this.handleMessage.bind(this))}}class bt extends o{constructor(){super("div",{className:"site-wrapper",id:"siteWrapper"});i(this,"webSocketAPI");this.webSocketAPI=new _t;const e=new fe(this.webSocketAPI),s=new pt(this.webSocketAPI),a=new ce;this.appendChildren([e,s,a])}}const ft=()=>new bt;class wt{constructor(t,e){i(this,"siteWrapper");i(this,"root");this.siteWrapper=t,this.root=e}start(){this.root.append(this.siteWrapper.element)}}const St=new wt(ft(),document.body);St.start();