// Switch between tabs
const tabs = ["playTab", "installationsTab", "newsTab", "downloadsTab", "modsTab", "infoTab", "socialMediaTab", "serversTab", "creditsTab", "settingsTab"];
const sections = ["playSection", "installationsSection", "newsSection", "downloadsSection", "modsSection", "infoSection", "socialMediaSection", "serversSection", "creditsSection", "settingsSection"];

tabs.forEach((tab, index) => {
    document.getElementById(tab).addEventListener("click", () => {
        switchTab(sections[index]);
        setActiveTab(tab);
    });
});

function switchTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });
    document.getElementById(tabId).classList.add("active");
}

function setActiveTab(tabId) {
    document.querySelectorAll(".sidebar-menu button").forEach(button => {
        button.classList.remove("active");
    });
    document.getElementById(tabId).classList.add("active");
}

const predefinedVersions = {
    official: [
        { version: "1.2.6", image: "images/version1.png", file: "1.2.6/index.html", downloadFile: "1.2.6/1.2.6.html" },
        { version: "1.3", image: "images/version2.png", file: "1.3/index.html", downloadFile: "1.3/1.3.html" },
        { version: "1.5.2", image: "images/version3.png", file: "1.5.2/index.html", downloadFile: "1.5.2/1.5.2.html" },
        { version: "1.6.4", image: "images/version6.4.png", file: "1.6.4/index.html", downloadFile: "1.6.4/1.6.4.html" },
        { version: "1.7.3", image: "images/version4.png", file: "1.7.3/index.html", downloadFile: "1.7.3/1.7.3.html" },
        { version: "1.8.8", image: "images/version5.png", file: "1.8.8/index.html", downloadFile: "1.8.8/1.8.8.html" },
        { version: "1.12.2", image: "images/version6.png", file: "1.12.2/index.html", downloadFile: "1.12.2/1.12.2.html" }
    ],
    pvp: [
        { version: "Astra Client", image: "images/pvp1.png", file: "Astra-Client/Astra.html", downloadFile: "Astra-Client/Astra-Client.html" },
        { version: "Pixel Client (1.8.8)", image: "images/pvp2.png", file: "Pixel-Client-1.8.8/Pixel-Client-1.8.8.html", downloadFile: "Pixel-Client-1.8.8/Pixel-Client-1.8.8.html" },
        { version: "Pixel Client (1.12.2)", image: "images/pvp3.png", file: "Pixel-Client-1.12.2/Pixel-Client-1.12.2.html", downloadFile: "Pixel-Client-1.12.2/Pixel-Client-1.12.2.html" },
        { version: "Resent Client", image: "images/pvp4.png", file: "Resent-Client/Resent.html", downloadFile: "Resent-Client/Resent-Client.html" },
        { version: "Kone Client", image: "images/kone_client.png", file: "Kone-Client/Kone.html", downloadFile: "Kone-Client/Kone-Client.html" }
    ],
    modded: [
        { version: "1.20 (EaglyMC a modded clients)", image: "images/eaglymc.png", file: "1.20-EaglyMC/index.html", downloadFile: "1.20-EaglyMC/Eaglymc_offline_u6_wasm_gc.html" },
        { version: "EaglerForge", image: "images/modded1.png", downloadFile: "EaglerForge/EaglerForge.html" },
        { version: "PixelClient (Wispcraft)", image: "images/wispcraft.png", downloadFile: "Wispcraft/PixelClient 1.8.8 WASM Offline with Wispcraft.html" }
    ]
};

let addedVersions = JSON.parse(localStorage.getItem("addedVersions")) || [];

function renderPredefinedVersions() {
    const officialContainer = document.querySelector("#installationsSection .category:nth-child(1) .versions-container");
    const pvpContainer = document.querySelector("#installationsSection .category:nth-child(2) .versions-container");
    const moddedContainer = document.querySelector("#installationsSection .category:nth-child(3) .versions-container");

    // Official Clients
    officialContainer.innerHTML = "";
    predefinedVersions.official.forEach((versionData) => {
        const versionCard = document.createElement("div");
        versionCard.classList.add("version-card");
        versionCard.innerHTML = `
            <img src="${versionData.image}" alt="${versionData.version}">
            <h3>${versionData.version}</h3>
            <button onclick="toggleVersion('${versionData.version}', 'official', '${versionData.file}')">
                ${addedVersions.includes(versionData.version) ? translations[currentLanguage].removeVersion : translations[currentLanguage].addVersion}
            </button>
        `;
        officialContainer.appendChild(versionCard);
    });

    // PvP Clients
    pvpContainer.innerHTML = "";
    predefinedVersions.pvp.forEach((versionData) => {
        const versionCard = document.createElement("div");
        versionCard.classList.add("version-card");
        versionCard.innerHTML = `
            <img src="${versionData.image}" alt="${versionData.version}">
            <h3>${versionData.version}</h3>
            <button onclick="toggleVersion('${versionData.version}', 'pvp', '${versionData.file}')">
                ${addedVersions.includes(versionData.version) ? translations[currentLanguage].removeVersion : translations[currentLanguage].addVersion}
            </button>
        `;
        pvpContainer.appendChild(versionCard);
    });

    // Modded Clients (only 1.20 EaglyMC)
    moddedContainer.innerHTML = "";
    const eaglyMC = predefinedVersions.modded.find(v => v.version.includes("EaglyMC"));
    if (eaglyMC) {
        const versionCard = document.createElement("div");
        versionCard.classList.add("version-card");
        versionCard.innerHTML = `
            <img src="${eaglyMC.image}" alt="${eaglyMC.version}">
            <h3>${eaglyMC.version}</h3>
            <button onclick="toggleVersion('${eaglyMC.version}', 'modded', '${eaglyMC.file}')">
                ${addedVersions.includes(eaglyMC.version) ? translations[currentLanguage].removeVersion : translations[currentLanguage].addVersion}
            </button>
        `;
        moddedContainer.appendChild(versionCard);
    }
}

function toggleVersion(version, type, file = "") {
    if (addedVersions.includes(version)) {
        addedVersions = addedVersions.filter((v) => v !== version);
    } else {
        addedVersions.push(version);
    }
    localStorage.setItem("addedVersions", JSON.stringify(addedVersions));
    renderPredefinedVersions();
    updateVersionSelect();
}

function updateVersionSelect() {
    const versionSelect = document.getElementById("versionSelect");
    versionSelect.innerHTML = "";
    addedVersions.forEach((version) => {
        const option = document.createElement("option");
        option.value = version;
        option.textContent = version;
        versionSelect.appendChild(option);
    });
}

document.getElementById("playButton").addEventListener("click", () => {
    const selectedVersion = document.getElementById("versionSelect").value;
    if (selectedVersion) {
        const allVersions = [...predefinedVersions.official, ...predefinedVersions.pvp, ...predefinedVersions.modded];
        const versionData = allVersions.find((v) => v.version === selectedVersion && v.file);
        if (versionData) {
            window.location.href = `versions/${versionData.file}`;
        } else {
            alert(translations[currentLanguage].noPlayableFile);
        }
    } else {
        alert(translations[currentLanguage].selectVersionAlert);
    }
});

const news = [
    {
        title: {
            en: "Version 0.0.3 Released!",
            es: "¡Versión 0.0.3 Publicada!",
            fr: "Version 0.0.3 Publiée!",
            de: "Version 0.0.3 Veröffentlicht!",
            pt: "Versão 0.0.3 Lançada!"
        },
        content: {
            en: "Major update! New features include:",
            es: "¡Actualización importante! Nuevas características incluyen:",
            fr: "Mise à jour majeure! Nouvelles fonctionnalités incluent:",
            de: "Großes Update! Neue Funktionen beinhalten:",
            pt: "Atualização importante! Novos recursos incluem:"
        },
        features: {
            en: [
                "Multi-language support (ES/EN/FR/DE/PT)",
                "New versions: 1.20 (EaglyMC a modded clients) and Kone Client",
                "15+ new mods added",
                "Dynamic translation system",
                "Performance improvements",
                "More intuitive interface"
            ],
            es: [
                "Soporte multi-idioma (ES/EN/FR/DE/PT)",
                "Nuevas versiones: 1.20 (EaglyMC a modded clients) y Kone Client",
                "15+ nuevos mods añadidos",
                "Sistema de traducción dinámica",
                "Mejoras de rendimiento",
                "Interfaz más intuitiva"
            ],
            fr: [
                "Support multilingue (ES/EN/FR/DE/PT)",
                "Nouvelles versions: 1.20 (EaglyMC a modded clients) et Kone Client",
                "15+ nouveaux mods ajoutés",
                "Système de traduction dynamique",
                "Améliorations des performances",
                "Interface plus intuitive"
            ],
            de: [
                "Mehrsprachige Unterstützung (ES/EN/FR/DE/PT)",
                "Neue Versionen: 1.20 (EaglyMC a modded clients) und Kone Client",
                "15+ neue Mods hinzugefügt",
                "Dynamisches Übersetzungssystem",
                "Leistungsverbesserungen",
                "Intuitivere Oberfläche"
            ],
            pt: [
                "Suporte multi-idioma (ES/EN/FR/DE/PT)",
                "Novas versões: 1.20 (EaglyMC a modded clients) e Kone Client",
                "15+ novos mods adicionados",
                "Sistema de tradução dinâmica",
                "Melhorias de desempenho",
                "Interface mais intuitiva"
            ]
        },
        date: "2025-04-15",
        isNew: true
    },
    {
        title: {
            en: "Version 0.0.2 Released",
            es: "Versión 0.0.2 Publicada",
            fr: "Version 0.0.2 Publiée",
            de: "Version 0.0.2 Veröffentlicht",
            pt: "Versão 0.0.2 Lançada"
        },
        content: {
            en: "UI improvements and new features added.",
            es: "Mejoras en la interfaz y nuevas características añadidas.",
            fr: "Améliorations de l'interface et nouvelles fonctionnalités ajoutées.",
            de: "UI-Verbesserungen und neue Funktionen hinzugefügt.",
            pt: "Melhorias na interface e novos recursos adicionados."
        },
        date: "2025-03-20",
        isNew: false
    },
    {
        title: {
            en: "Version 0.0.1 - First Release!",
            es: "Versión 0.0.1 - ¡Primer Lanzamiento!",
            fr: "Version 0.0.1 - Première Version!",
            de: "Version 0.0.1 - Erste Veröffentlichung!",
            pt: "Versão 0.0.1 - Primeiro Lançamento!"
        },
        content: {
            en: "Initial release of the Eaglercraft Launcher. Added support for multiple versions (1.2.6 - 1.12.2).",
            es: "Lanzamiento inicial del Eaglercraft Launcher. Añadido soporte para múltiples versiones (1.2.6 - 1.12.2).",
            fr: "Version initiale du Eaglercraft Launcher. Ajout du support pour plusieurs versions (1.2.6 - 1.12.2).",
            de: "Erstveröffentlichung des Eaglercraft Launchers. Unterstützung für mehrere Versionen hinzugefügt (1.2.6 - 1.12.2).",
            pt: "Lançamento inicial do Eaglercraft Launcher. Adicionado suporte para múltiplas versões (1.2.6 - 1.12.2)."
        },
        date: "2025-03-15",
        isNew: false
    }
];

function renderNews() {
    const newsContainer = document.querySelector(".news-container");
    newsContainer.innerHTML = "";
    news.forEach((item) => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        
        let featuresHtml = "";
        if (item.features) {
            featuresHtml = "<ul>";
            item.features[currentLanguage].forEach(feature => {
                featuresHtml += `<li>${feature}</li>`;
            });
            featuresHtml += "</ul>";
        }
        
        newsItem.innerHTML = `
            <h3>${item.title[currentLanguage]} ${item.isNew ? '<span class="new-badge">'+translations[currentLanguage].newBadge+'</span>' : ''}</h3>
            <p>${item.content[currentLanguage]}</p>
            ${featuresHtml}
            <small>${item.date}</small>
        `;
        newsContainer.appendChild(newsItem);
    });
}

const servers = [
    { name: "KrypticMC", ip: "wss://eagler.krypticmc.net" },
    { name: "Zentic.cc", ip: "wss://zentic.cc" },
    { name: "Blobcraft", ip: "wss://blobcraft.club" }
];

function renderServers() {
    const serversContainer = document.querySelector(".servers-container");
    serversContainer.innerHTML = "";
    servers.forEach((server) => {
        const serverCard = document.createElement("div");
        serverCard.classList.add("server-card");
        serverCard.innerHTML = `
            <h3>${server.name}</h3>
            <p>${server.ip}</p>
            <button onclick="connectToServer('${server.ip}')">${translations[currentLanguage].copyIP}</button>
        `;
        serversContainer.appendChild(serverCard);
    });
}

function connectToServer(ip) {
    navigator.clipboard.writeText(ip)
        .then(() => {
            alert(translations[currentLanguage].ipCopied + ip);
        })
        .catch((err) => {
            console.error("Failed to copy IP: ", err);
            alert(translations[currentLanguage].copyFailed);
        });
}

function downloadVersion(file) {
    const allVersions = [...predefinedVersions.official, ...predefinedVersions.pvp, ...predefinedVersions.modded];
    const versionData = allVersions.find(v => v.file === file || v.downloadFile === file);
    if (versionData) {
        const link = document.createElement("a");
        link.href = `downloads/${versionData.downloadFile}`;
        link.download = versionData.downloadFile.split('/').pop();
        link.click();
    }
}

function renderDownloads() {
    const officialContainer = document.querySelector("#downloadsSection .category:nth-child(1) .versions-container");
    const pvpContainer = document.querySelector("#downloadsSection .category:nth-child(2) .versions-container");
    const moddedContainer = document.querySelector("#downloadsSection .category:nth-child(3) .versions-container");

    // Official Clients
    officialContainer.innerHTML = "";
    predefinedVersions.official.forEach((versionData) => {
        const versionCard = document.createElement("div");
        versionCard.classList.add("version-card");
        versionCard.innerHTML = `
            <img src="${versionData.image}" alt="${versionData.version}">
            <h3>${versionData.version}</h3>
            <button onclick="downloadVersion('${versionData.downloadFile}')">${translations[currentLanguage].download}</button>
        `;
        officialContainer.appendChild(versionCard);
    });

    // PvP Clients
    pvpContainer.innerHTML = "";
    predefinedVersions.pvp.forEach((versionData) => {
        const versionCard = document.createElement("div");
        versionCard.classList.add("version-card");
        versionCard.innerHTML = `
            <img src="${versionData.image}" alt="${versionData.version}">
            <h3>${versionData.version}</h3>
            <button onclick="downloadVersion('${versionData.downloadFile}')">${translations[currentLanguage].download}</button>
        `;
        pvpContainer.appendChild(versionCard);
    });

    // All Modded Clients
    moddedContainer.innerHTML = "";
    predefinedVersions.modded.forEach((versionData) => {
        const versionCard = document.createElement("div");
        versionCard.classList.add("version-card");
        versionCard.innerHTML = `
            <img src="${versionData.image}" alt="${versionData.version}">
            <h3>${versionData.version}</h3>
            <button onclick="downloadVersion('${versionData.downloadFile}')">${translations[currentLanguage].download}</button>
        `;
        moddedContainer.appendChild(versionCard);
    });
}

const mods = [
    { name: "AFK Mod", file: "afkmod.js" },
    { name: "Arbitrary Model", file: "arbitrary_model.js" },
    { name: "Async Sink", file: "AsyncSink.js" },
    { name: "Block of Steve (Advanced)", file: "block_of_steve_advanced.js" },
    { name: "Block of Steve (Simple)", file: "block_of_steve_simple.js" },
    { name: "Cube Entity", file: "cubeentity.js" },
    { name: "Custom Items Demo", file: "CustomItemsDemo.js" },
    { name: "Diamond Block Craft", file: "diamondBlockCustomCraft.js" },
    { name: "Duck Mod", file: "DuckMod.js" },
    { name: "Dupe Hunting", file: "dupe_hunting.js" },
    { name: "Entity Trace Test", file: "entity_trace_test.js" },
    { name: "F11 Fix", file: "f11fix.js" },
    { name: "Flammable String", file: "flammable_string.js" },
    { name: "Grapple Hook", file: "grapplehook.js" },
    { name: "Guns (Craftable)", file: "guns_craftable.js" },
    { name: "Guns", file: "guns.js" },
    { name: "Hats", file: "hats.js" },
    { name: "Jenny Skin", file: "jenny_skin.js" },
    { name: "Custom Items Library", file: "lib.customitems.js" },
    { name: "Microphone", file: "microphone.js" },
    { name: "No Block Particles", file: "no_block_particles.js" },
    { name: "No Particles", file: "no_particles.js" },
    { name: "High Poly Skin Render", file: "render_arbitrary_highpolyskin.js" },
    { name: "Server Mod", file: "servermod.js" },
    { name: "Sliders", file: "sliders.js" },
    { name: "Slippery Blocks", file: "slippery.js" },
    { name: "Talkback", file: "talkback.js" },
    { name: "Timescale Command", file: "timescale_command.js" },
    { name: "Custom Block Tutorial", file: "Tutorial_Custom_Block.js" },
    { name: "Custom Item Tutorial", file: "Tutorial_Custom_Item.js" },
    { name: "Unlucky Blocks", file: "unlucky_blocks.js" },
    { name: "Useless Item Example", file: "useless_item_example_mod.js" },
    { name: "Vertical Clip", file: "vclip.js" },
    { name: "Waypoints", file: "waypoints.js" },
    { name: "WorldEdit", file: "Worldedit.js" },
    { name: "XP Spawner", file: "xpspawner.js" }
];

function renderMods() {
    const modsContainer = document.querySelector(".mods-container");
    modsContainer.innerHTML = "";
    mods.forEach((mod) => {
        const modCard = document.createElement("div");
        modCard.classList.add("mod-card");
        modCard.innerHTML = `
            <h3>${mod.name}</h3>
            <button onclick="downloadMod('${mod.file}')">${translations[currentLanguage].download}</button>
        `;
        modsContainer.appendChild(modCard);
    });
}

function downloadMod(file) {
    const link = document.createElement("a");
    link.href = `mods/${file}`;
    link.download = file;
    link.click();
}

document.getElementById("backgroundToggle").addEventListener("change", function() {
    const background = document.querySelector(".background");
    if (this.checked) {
        background.style.display = "block";
    } else {
        background.style.display = "none";
    }
});

const translations = {
    en: {
        play: "Play",
        installations: "Installations",
        news: "News",
        downloads: "Downloads",
        mods: "Mods",
        info: "Info",
        socialMedia: "Social Media",
        servers: "Servers",
        credits: "Credits",
        settings: "Settings",
        selectVersion: "Select Version:",
        latestNews: "Latest News 🆕",
        backgroundAnim: "Background Animation",
        disableLag: "Disable if you experience lag",
        language: "Language",
        selectLanguage: "Select your preferred language",
        license: "License",
        moreServers: "For more servers, visit:",
        addVersion: "Add Version",
        removeVersion: "Remove Version",
        download: "Download",
        copyIP: "Copy IP",
        ipCopied: "IP copied to clipboard: ",
        copyFailed: "Failed to copy IP. Please try again.",
        selectVersionAlert: "Please select a version to play!",
        noPlayableFile: "This version doesn't have a playable file!",
        newBadge: "NEW",
        officialClients: "Official Clients",
        pvpClients: "PvP Clients",
        moddedClients: "Modded Clients",
        joinDiscord: "Join our Discord Server",
        credit1: "The developer and coder of this project.",
        credit2: "The person who helped me on some stuff and gave me files.",
        credit3: "That you made this project possible supporting me ❤️",
        footerCredit: "Please give appropriate credit"
    },
    es: {
        play: "Jugar",
        installations: "Instalaciones",
        news: "Noticias",
        downloads: "Descargas",
        mods: "Mods",
        info: "Información",
        socialMedia: "Redes Sociales",
        servers: "Servidores",
        credits: "Créditos",
        settings: "Ajustes",
        selectVersion: "Seleccionar versión:",
        latestNews: "Últimas Noticias 🆕",
        backgroundAnim: "Animación de fondo",
        disableLag: "Desactivar si hay lag",
        language: "Idioma",
        selectLanguage: "Selecciona tu idioma preferido",
        license: "Licencia",
        moreServers: "Para más servidores, visita:",
        addVersion: "Añadir Versión",
        removeVersion: "Quitar Versión",
        download: "Descargar",
        copyIP: "Copiar IP",
        ipCopied: "IP copiada al portapapeles: ",
        copyFailed: "Error al copiar IP. Por favor, inténtalo de nuevo.",
        selectVersionAlert: "¡Por favor selecciona una versión para jugar!",
        noPlayableFile: "¡Esta versión no tiene un archivo ejecutable!",
        newBadge: "NUEVO",
        officialClients: "Clientes Oficiales",
        pvpClients: "Clientes PvP",
        moddedClients: "Clientes Modificados",
        joinDiscord: "Únete a nuestro servidor de Discord",
        credit1: "El desarrollador y programador de este proyecto.",
        credit2: "La persona que me ayudó con algunas cosas y me dio archivos.",
        credit3: "Que hiciste este proyecto posible apoyándome ❤️",
        footerCredit: "Por favor da el crédito apropiado"
    },
    fr: {
        play: "Jouer",
        installations: "Installations",
        news: "Nouvelles",
        downloads: "Téléchargements",
        mods: "Mods",
        info: "Info",
        socialMedia: "Réseaux Sociaux",
        servers: "Serveurs",
        credits: "Crédits",
        settings: "Paramètres",
        selectVersion: "Sélectionner la version:",
        latestNews: "Dernières Nouvelles 🆕",
        backgroundAnim: "Animation d'arrière-plan",
        disableLag: "Désactiver en cas de lag",
        language: "Langue",
        selectLanguage: "Sélectionnez votre langue préférée",
        license: "Licence",
        moreServers: "Pour plus de serveurs, visitez:",
        addVersion: "Ajouter Version",
        removeVersion: "Supprimer Version",
        download: "Télécharger",
        copyIP: "Copier IP",
        ipCopied: "IP copiée dans le presse-papiers: ",
        copyFailed: "Échec de la copie de l'IP. Veuillez réessayer.",
        selectVersionAlert: "Veuillez sélectionner une version à jouer!",
        noPlayableFile: "Cette version n'a pas de fichier exécutable!",
        newBadge: "NOUVEAU",
        officialClients: "Clients Officiels",
        pvpClients: "Clients PvP",
        moddedClients: "Clients Modifiés",
        joinDiscord: "Rejoignez notre serveur Discord",
        credit1: "Le développeur et codeur de ce projet.",
        credit2: "La personne qui m'a aidé sur certaines choses et m'a donné des fichiers.",
        credit3: "Que vous avez rendu ce projet possible en me soutenant ❤️",
        footerCredit: "Veuillez donner le crédit approprié"
    },
    de: {
        play: "Spielen",
        installations: "Installationen",
        news: "Neuigkeiten",
        downloads: "Downloads",
        mods: "Mods",
        info: "Info",
        socialMedia: "Soziale Medien",
        servers: "Server",
        credits: "Credits",
        settings: "Einstellungen",
        selectVersion: "Version wählen:",
        latestNews: "Aktuelle Neuigkeiten 🆕",
        backgroundAnim: "Hintergrundanimation",
        disableLag: "Deaktivieren bei Lag-Problemen",
        language: "Sprache",
        selectLanguage: "Bevorzugte Sprache wählen",
        license: "Lizenz",
        moreServers: "Für weitere Server besuchen Sie:",
        addVersion: "Version Hinzufügen",
        removeVersion: "Version Entfernen",
        download: "Herunterladen",
        copyIP: "IP Kopieren",
        ipCopied: "IP in die Zwischenablage kopiert: ",
        copyFailed: "Fehler beim Kopieren der IP. Bitte versuchen Sie es erneut.",
        selectVersionAlert: "Bitte wählen Sie eine Version zum Spielen!",
        noPlayableFile: "Diese Version hat keine ausführbare Datei!",
        newBadge: "NEU",
        officialClients: "Offizielle Clients",
        pvpClients: "PvP-Clients",
        moddedClients: "Modifizierte Clients",
        joinDiscord: "Treten Sie unserem Discord-Server bei",
        credit1: "Der Entwickler und Programmierer dieses Projekts.",
        credit2: "Die Person, die mir bei einigen Dingen geholfen und mir Dateien gegeben hat.",
        credit3: "Dass du dieses Projekt möglich gemacht hast, indem du mich unterstützt hast ❤️",
        footerCredit: "Bitte geben Sie entsprechendes Kredit"
    },
    pt: {
        play: "Jogar",
        installations: "Instalações",
        news: "Notícias",
        downloads: "Downloads",
        mods: "Mods",
        info: "Informação",
        socialMedia: "Redes Sociais",
        servers: "Servidores",
        credits: "Créditos",
        settings: "Configurações",
        selectVersion: "Selecionar versão:",
        latestNews: "Últimas Notícias 🆕",
        backgroundAnim: "Animação de fundo",
        disableLag: "Desativar se houver lag",
        language: "Idioma",
        selectLanguage: "Selecione seu idioma preferido",
        license: "Licença",
        moreServers: "Para mais servidores, visite:",
        addVersion: "Adicionar Versão",
        removeVersion: "Remover Versão",
        download: "Baixar",
        copyIP: "Copiar IP",
        ipCopied: "IP copiada para a área de transferência: ",
        copyFailed: "Falha ao copiar IP. Por favor, tente novamente.",
        selectVersionAlert: "Por favor selecione uma versão para jogar!",
        noPlayableFile: "Esta versão não tem um arquivo executável!",
        newBadge: "NOVO",
        officialClients: "Clientes Oficiais",
        pvpClients: "Clientes PvP",
        moddedClients: "Clientes Modificados",
        joinDiscord: "Junte-se ao nosso servidor do Discord",
        credit1: "O desenvolvedor e programador deste projeto.",
        credit2: "A pessoa que me ajudou com algumas coisas e me deu arquivos.",
        credit3: "Que você tornou este projeto possível me apoiando ❤️",
        footerCredit: "Por favor, dê o crédito apropriado"
    }
};

let currentLanguage = localStorage.getItem('launcherLanguage') || 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('launcherLanguage', lang);
    applyTranslations();
}

function applyTranslations() {
    // Sidebar buttons
    document.getElementById('playTab').textContent = translations[currentLanguage].play;
    document.getElementById('installationsTab').textContent = translations[currentLanguage].installations;
    document.getElementById('newsTab').textContent = translations[currentLanguage].news;
    document.getElementById('downloadsTab').textContent = translations[currentLanguage].downloads;
    document.getElementById('modsTab').textContent = translations[currentLanguage].mods;
    document.getElementById('infoTab').textContent = translations[currentLanguage].info;
    document.getElementById('socialMediaTab').textContent = translations[currentLanguage].socialMedia;
    document.getElementById('serversTab').textContent = translations[currentLanguage].servers;
    document.getElementById('creditsTab').textContent = translations[currentLanguage].credits;
    document.getElementById('settingsTab').textContent = translations[currentLanguage].settings;

    // Play section
    document.querySelector('.version-selector label').textContent = translations[currentLanguage].selectVersion;
    document.querySelector('.recent-news h3').textContent = translations[currentLanguage].latestNews;
    document.getElementById('playButton').textContent = translations[currentLanguage].play;

    // Section titles
    document.querySelector('#installationsSection h2').textContent = translations[currentLanguage].installations;
    document.querySelector('#newsSection h2').textContent = translations[currentLanguage].news;
    document.querySelector('#downloadsSection h2').textContent = translations[currentLanguage].downloads;
    document.querySelector('#modsSection h2').textContent = translations[currentLanguage].mods;
    document.querySelector('#infoSection h2').textContent = translations[currentLanguage].license;
    document.querySelector('#socialMediaSection h2').textContent = translations[currentLanguage].socialMedia;
    document.querySelector('#serversSection h2').textContent = translations[currentLanguage].servers;
    document.querySelector('#creditsSection h2').textContent = translations[currentLanguage].credits;
    document.querySelector('#settingsSection h2').textContent = translations[currentLanguage].settings;

    // Category titles
    document.querySelectorAll('#installationsSection .category h3')[0].textContent = translations[currentLanguage].officialClients;
    document.querySelectorAll('#installationsSection .category h3')[1].textContent = translations[currentLanguage].pvpClients;
    document.querySelectorAll('#installationsSection .category h3')[2].textContent = translations[currentLanguage].moddedClients;
    document.querySelectorAll('#downloadsSection .category h3')[0].textContent = translations[currentLanguage].officialClients;
    document.querySelectorAll('#downloadsSection .category h3')[1].textContent = translations[currentLanguage].pvpClients;
    document.querySelectorAll('#downloadsSection .category h3')[2].textContent = translations[currentLanguage].moddedClients;

    // Settings
    document.querySelectorAll('.setting-item h3')[0].textContent = translations[currentLanguage].backgroundAnim;
    document.querySelectorAll('.setting-item p')[0].textContent = translations[currentLanguage].disableLag;
    document.querySelectorAll('.setting-item h3')[1].textContent = translations[currentLanguage].language;
    document.querySelectorAll('.setting-item p')[1].textContent = translations[currentLanguage].selectLanguage;

    // Social media
    document.querySelector('.social-media-link span').textContent = translations[currentLanguage].joinDiscord;

    // More servers text
    document.querySelector('.more-servers p').textContent = translations[currentLanguage].moreServers;

    // Credits
    document.querySelectorAll('.credit-text[data-key="credit1"]').forEach(el => {
        el.textContent = translations[currentLanguage].credit1;
    });
    document.querySelectorAll('.credit-text[data-key="credit2"]').forEach(el => {
        el.textContent = translations[currentLanguage].credit2;
    });
    document.querySelectorAll('.credit-text[data-key="credit3"]').forEach(el => {
        el.textContent = translations[currentLanguage].credit3;
    });

    // Footer
    document.querySelector('.footer-text').textContent = translations[currentLanguage].footerCredit;

    // Re-render dynamic content
    renderPredefinedVersions();
    renderNews();
    renderServers();
    renderDownloads();
    renderMods();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('languageSelect').value = currentLanguage;
    document.getElementById('languageSelect').addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });
    applyTranslations();
});

function initialize() {
    renderPredefinedVersions();
    updateVersionSelect();
    renderNews();
    renderServers();
    renderDownloads();
    renderMods();
}

initialize();
