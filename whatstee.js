const button = `
<rt-candidate-profile-information-editor-group-entry class="ng-star-inserted">
    <a target="_blank" href="https://wa.me/" class="ng-star-inserted">
        <img width="24" height="24" draggable="false" style="vertical-align: top;"
            src="https://www.shareicon.net/data/512x512/2016/07/10/119959_whatsapp_512x512.png">
    </a>
</rt-candidate-profile-information-editor-group-entry>
`

let [email, phone, socials] = document.querySelectorAll('rt-candidate-profile-information-editor-group')

phone = [...phone.querySelectorAll('a')].map(a => a.innerText)

const insertWAButton = () => {

    const buttons = document.querySelectorAll('rt-candidate-profile-information-editor-group')[2]
        .querySelector('.field__values-list')
        .innerHTML + button

    document.querySelectorAll('rt-candidate-profile-information-editor-group')[2]
        .querySelector('.field__values-list')
        .innerHTML = buttons
}

insertWAButton()