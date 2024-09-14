document.addEventListener('DOMContentLoaded', () => {
    const games = {
        1: {
            name: 'Chain Cube 2048',
            appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
            promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
            timing: 20000,
            attempts: 15,
        },
        2: {
            name: 'Train Miner',
            appToken: '82647f43-3f87-402d-88dd-09a90025313f',
            promoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954',
            timing: 20000,
            attempts: 15,
        },
        3: {
            name: 'Merge Away',
            appToken: '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
            promoId: 'dc128d28-c45b-411c-98ff-ac7726fbaea4',
            timing: 20000,
            attempts: 15,
        },
        4: {
            name: 'Twerk Race 3D',
            appToken: '61308365-9d16-4040-8bb0-2f4a4c69074c',
            promoId: '61308365-9d16-4040-8bb0-2f4a4c69074c',
            timing: 20000,
            attempts: 20,
        },
        5: {
            name: 'Polysphere',
            appToken: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
            promoId: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
            timing: 20000,
            attempts: 20,
        },
        6: {
            name: 'Mow and Trim',
            appToken: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
            promoId: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
            timing: 20000,
            attempts: 20,
        },
        7: {
            name: 'Zoopolis',
            appToken: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            promoId: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            timing: 20000,
            attempts: 20,
        },
        8: {
            name: 'Tile Trio',
            appToken: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7',
            promoId: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7',
            timing: 20000,
            attempts: 20,
        },
        9: {
            name: 'Fluff Crusade',
            appToken: '112887b0-a8af-4eb2-ac63-d82df78283d9',
            promoId: '112887b0-a8af-4eb2-ac63-d82df78283d9',
            timing: 20000,
            attempts: 30,
        },
        10: {
            name: 'Stone Age',
            appToken: '04ebd6de-69b7-43d1-9c4b-04a6ca3305af',
            promoId: '04ebd6de-69b7-43d1-9c4b-04a6ca3305af',
            timing: 22000,
            attempts: 25,
        },
        11: {
            name: 'Bouncemasters',
            appToken: 'bc72d3b9-8e91-4884-9c33-f72482f0db37',
            promoId: 'bc72d3b9-8e91-4884-9c33-f72482f0db37',
            timing: 20000,
            attempts: 30,
        },
        12: {
            name: 'Hide Ball',
            appToken: '4bf4966c-4d22-439b-8ff2-dc5ebca1a600',
            promoId: '4bf4966c-4d22-439b-8ff2-dc5ebca1a600',
            timing: 40000,
            attempts: 30,
        }
    };

    const gameOptions = document.querySelectorAll('.game-option');
    const keyCountGroup = document.getElementById('keyCountGroup');
    const keyRange = document.getElementById('keyRange');
    const keyValue = document.getElementById('keyValue');
    const startBtn = document.getElementById('startBtn');
    const keyCountLabel = document.getElementById('keyCountLabel');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressLog = document.getElementById('progressLog');
    const keyContainer = document.getElementById('keyContainer');
    const keysList = document.getElementById('keysList');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const generatedKeysTitle = document.getElementById('generatedKeysTitle');
    const copyStatus = document.getElementById('copyStatus');
    const generateMoreBtn = document.getElementById('generateMoreBtn');

    let selectedGame = null;

    gameOptions.forEach(option => {
        option.addEventListener('click', () => {
            gameOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedGame = option.dataset.game;

            keyCountGroup.classList.remove('hidden');
            startBtn.classList.remove('hidden');

            keyCountGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    keyRange.addEventListener('input', () => {
        keyValue.innerText = keyRange.value;
    });

    startBtn.addEventListener('click', async () => {
    const keyCount = parseInt(keyRange.value);
    if (!selectedGame) {
        alert('! لطفا یک بازی انتخاب کنید');
        return;
    }

    if (selectedGame === 'all') {
        const gamesArray = Object.values(games);
        const totalKeysCount = keyCount * gamesArray.length;
        keyCountLabel.innerText = `تعداد کلیدها: ${totalKeysCount}`;

        const allKeys = [];

        await Promise.all(gamesArray.map(async (game) => {
            const keys = await generateKeysForGame(game, keyCount);
            allKeys.push(...keys);
        }));

        displayKeys(allKeys);
    } else {
        const gameChoice = parseInt(selectedGame);
        const game = games[gameChoice];
        const keys = await generateKeysForGame(game, keyCount);
        keyCountLabel.innerText = `تعداد کلیدها: ${keys.length}`;
        displayKeys(keys);
    }
});

const generateKeysForGame = async (game, keyCount) => {
    document.querySelector('.grid-container').style.display = 'none';
    keyCountGroup.style.display = 'none';

    keyCountLabel.innerText = `تعداد کلیدها: ${keyCount}`;

    progressBar.style.width = '0%';
    progressText.innerText = '0%';
    progressLog.innerText = `${game.name}: ... درحال ساخت کلید\n لطفا تا پایان عملیات منتظر بمانید`;
    progressContainer.classList.remove('hidden');
    keyContainer.classList.add('hidden');
    generatedKeysTitle.classList.add('hidden');
    keysList.innerHTML = '';
    copyAllBtn.classList.add('hidden');
    startBtn.classList.add('hidden');
    startBtn.disabled = true;

    let progress = 0;
    const updateProgress = (increment, message) => {
        progress += increment;
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `${progress}%`;
        progressLog.innerText = message;
    };

    const generateKeyProcess = async () => {
        const clientId = generateClientId();
        let clientToken;
        try {
            clientToken = await login(clientId, game.appToken);
        } catch (error) {
            alert(`Failed to login: ${error.message}`);
            startBtn.disabled = false;
            return null;
        }

        for (let i = 0; i < game.attempts; i++) {
            const hasCode = await emulateProgress(clientToken, game.promoId);
            updateProgress((100 / game.attempts) / keyCount, `${game.name}: ${i + 1}/${game.attempts} ... درحال آماده سازی\n لطفا تا پایان عملیات منتظر بمانید`);
            if (hasCode) {
                break;
            }
            await sleep(game.timing);
        }

        try {
            const key = await generateKey(clientToken, game.promoId);
            updateProgress(100 / keyCount, `${game.name}: ... درحال ساخت کلید\n لطفا تا پایان عملیات منتظر بمانید`);
            return key;
        } catch (error) {
            alert(`Failed to generate key: ${error.message}`);
            return null;
        }
    };

    const keys = await Promise.all(Array.from({ length: keyCount }, generateKeyProcess));

    return keys.filter(key => key);
};

    const displayKeys = (allKeys) => {
    const groupedKeys = {};

    allKeys.forEach((key) => {
        const [prefix] = key.split('-');
        if (!groupedKeys[prefix]) {
            groupedKeys[prefix] = [];
        }
        groupedKeys[prefix].push(key);
    });

    const formattedKeys = Object.entries(groupedKeys).map(([game, keys]) => {
        const gameName = games[Object.keys(games).find(id => games[id].name.toUpperCase().includes(game.toUpperCase()))]?.name || game;
        return `\n--- ${gameName} ---\n${keys.map(k => `\`${k}\``).join('\n')}`;
    }).join('\n\n');

    const footer = `\n\nContact Creator: \`mrx_0_3\``;
    const finalTextToCopy = formattedKeys + footer;

    keysList.innerHTML = allKeys.length > 0 ?
        allKeys.map(key =>
            `<div class="key-item">
                <input type="text" value="\`${key}\`" readonly>
                <button class="copyKeyBtn" data-key="\`${key}\`">کپی</button>
            </div>`
        ).join('') :
        '<p>!هیچ کلیدی ساخته نشد <br> به نظر می‌رسد به دلیل ساخت مکرر کلیدها، با ارور لاگین مواجه شده‌اید. لطفا حافظه کش مرورگر را پاک کرده، از یک فیلترشکن مناسب استفاده و بعد از چند دقیقه دوباره امتحان کنید</p>';

    copyAllBtn.classList.toggle('hidden', allKeys.length === 0);
    keyContainer.classList.remove('hidden');
    generatedKeysTitle.classList.remove('hidden');
    startBtn.classList.remove('hidden');
    keyCountGroup.classList.remove('hidden');
    keyCountGroup.style.display = 'block';
    startBtn.disabled = false;

    document.querySelectorAll('.copyKeyBtn').forEach(button => {
        button.addEventListener('click', (event) => {
            const key = event.target.getAttribute('data-key');
            copyToClipboard(key);
        });
    });

    copyAllBtn.addEventListener('click', () => {
        copyToClipboard(finalTextToCopy);
    });

    progressBar.style.width = '100%';
    progressText.innerText = '100%';
    progressLog.innerText = '! تمام';

    startBtn.classList.remove('hidden');
    keyCountGroup.classList.remove('hidden');
    document.querySelector('.grid-container').style.display = 'grid';
    startBtn.disabled = false;
};

    const generateClientId = () => {
        const timestamp = Date.now();
        const randomNumbers = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
        return `${timestamp}-${randomNumbers}`;
    };

    const login = async (clientId, appToken) => {
        const response = await fetch('https://api.gamepromo.io/promo/login-client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appToken,
                clientId,
                clientOrigin: 'deviceid'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        return data.clientToken;
    };

    const emulateProgress = async (clientToken, promoId) => {
        const response = await fetch('https://api.gamepromo.io/promo/register-event', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${clientToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promoId,
                eventId: generateUUID(),
                eventOrigin: 'undefined'
            })
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data.hasCode;
    };

    const generateKey = async (clientToken, promoId) => {
        const response = await fetch('https://api.gamepromo.io/promo/create-code', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${clientToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promoId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate key');
        }

        const data = await response.json();
        return data.promoCode;
    };

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const copyToClipboard = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                copyStatus.classList.remove('hidden');
                setTimeout(() => copyStatus.classList.add('hidden'), 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.top = '0';
            textArea.style.left = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    copyStatus.classList.remove('hidden');
                    setTimeout(() => copyStatus.classList.add('hidden'), 2000);
                }
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }

            document.body.removeChild(textArea);
        }
    };
});
