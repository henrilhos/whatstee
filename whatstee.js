/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

function removeNotDigitCharacters(phone) { return '55' + phone.replace(/\D+/g, '') }
function addNinthDigit(phone) { return '9' + phone }
function addDDD(phone, ddd) { return ddd + phone }
function addCountryCode(phone, code) { return code + phone }

function convertPhone(phone) {
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

function getWAButton(phone) {
  return `
  <div _ngcontent-aqy-c70="" layout-horizontal="">
    <a _ngcontent-aqy-c70="" class="social-link" target="_blank" draggable="false"
      href="https://wa.me/${phone}">
      <img _ngcontent-aqy-c70="" draggable="false" width="24" height="24"
        src="https://www.shareicon.net/data/512x512/2016/07/10/119959_whatsapp_512x512.png" style="vertical-align: top;">
    </a>
  </div>
  `
}

function insertWAButton(phones) {
  const buttons = document.querySelectorAll('.field-row')[2]
    .querySelector('.field-value')
    .querySelector('div')
    .innerHTML + phones.map(getWAButton).join('')

  document.querySelectorAll('.field-row')[2]
    .querySelector('.field-value')
    .querySelector('div')
    .innerHTML = buttons
}

function getPhones() {
  return [...document.querySelectorAll('.field-row')[1].querySelectorAll('a')]
    .map(({ innerText }) => convertPhone(innerText))
}

function getCandidateId() {
  const url = new URL(document.URL.replace(/\#+/g, ''))
  const searchParams = new URLSearchParams(url.search)
  const candidateId = searchParams.get('candidate')

  return candidateId
}

const init = () => {
  if (document.querySelectorAll('rt-candidate-profile-information-new').length === 0) {
    setTimeout(init, 1000)

    return
  }

  const phones = getPhones()
  const candidateId = getCandidateId()

  insertWAButton(phones)
  validateCandidate(candidateId)
}

const validateCandidate = (oldCandidateId = undefined) => {
  const candidateId = getCandidateId()

  if (oldCandidateId !== candidateId) {
    init()
    return
  } else {
    setTimeout(() => {
      validateCandidate(candidateId)
    }, 1000);

    return
  }
}

(function () {
  init()
})()
