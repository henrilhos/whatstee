/* eslint-disable no-unused-vars */

let emails
let phones
let socials

const removeNotDigitCharacters = (phone) => '55' + phone.replace(/\D+/g, '')
const addNinthDigit = (phone) => '9' + phone
const addDDD = (phone, ddd) => ddd + phone
const addCountryCode = (phone, code) => code + phone

const convertPhone = (phone) => {
  phone = removeNotDigitCharacters(phone)

  const length = phone.length

  if (length === 8) {
    return addCountryCode(addDDD(addNinthDigit(phone), 47), 55)
  } else if (length === 9) {
    return addCountryCode(addDDD(phone, 47), 55)
  } else if (length === 10) {
    const splitedPhone = [phone.split('').slice(0, 2).join(''), phone.split('').slice(2).join('')]

    return addCountryCode(addDDD(addNinthDigit(splitedPhone[1]), splitedPhone[0]), 55)
  } else if (length === 11) {
    return addCountryCode(phone, 55)
  }

  return phone
}

const getWAButton = (phone) => `
  <span class="ng-star-inserted" style="margin-top: 8px; margin-bottom: 8px; margin-right: 12px;">
      <a target="_blank" href="https://wa.me/${phone}" class="ng-star-inserted">
          <img width="24" height="24" draggable="false" style="vertical-align: top;"
              src="https://www.shareicon.net/data/512x512/2016/07/10/119959_whatsapp_512x512.png">
      </a>
  </span>
  `

const insertWAButton = (phones) => {
  const buttons = document.querySelectorAll('rt-candidate-profile-information-editor-group')[2]
    .querySelector('.field__values-list')
    .innerHTML + phones.map(getWAButton).join('')

  document.querySelectorAll('rt-candidate-profile-information-editor-group')[2]
    .querySelector('.field__values-list')
    .innerHTML = buttons
}

// Execution code

[emails, phones, socials] = document.querySelectorAll('rt-candidate-profile-information-editor-group')

phones = [...phones.querySelectorAll('a')]
  .map(({ innerText }) => convertPhone(innerText))

insertWAButton(phones)
