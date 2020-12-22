import Job from './Job.js'

const TTS_ENDPOINT = 'https://www.google.com/speech-api/v1/synthesize'
const JOB_ICON_ENDPOINT = 'https://raw.githubusercontent.com/xivapi/classjob-icons/master/companion'

export default class View {
  me = null
  app = null
  sayType = null
  images = {}

  constructor (app, sayType = Job.NameTypes.KOREAN_SHORT) {
    this.app = app
    this.sayType = sayType
    this.preloadTiles()
  }

  say (opts) {
    if (typeof opts === 'string') {
      return this.say({ text: opts, lang: 'ko', speed: 0.6 })
    }

    const params = new URLSearchParams(opts)
    return new Audio(`${TTS_ENDPOINT}?${params}`).play()
  }
  
  clearTiles () {
    while (this.app.hasChildNodes()) {
      this.app.removeChild(this.app.firstChild)
    }
  }
  
  getTile (name) {
    if (name instanceof Job) {
      return this.getTile(name.getName(Job.NameTypes.XIVAPI))
    }
  
    if (this.images[name]) return this.images[name]
    const url = `${JOB_ICON_ENDPOINT}/${name}.png`
  
    return new Promise(resolve => {
      const img = document.createElement('img')
      img.setAttribute('src', url)
      img.setAttribute('width', '32')
      img.setAttribute('height', '32')
      img.addEventListener('load', () => resolve((this.images[name] = img)))
    })
  }

  async preloadTiles () {
    this.app.appendChild(await this.getTile('none'))
    await Promise.all(Job.instances.map(n => this.getTile(n)))
  }

  update ({ me, party, priority, gaols }) {
    if (me) {
      this.me = me
      console.log('player updated', me)
    }

    if (party) {
      console.log('party updated', party)
    }

    if (priority) {
      this.say(`현재 설정된 돌감옥 우선순위는 ${priority}입니다.`)
      console.log('priority updated', priority)
    }

    if (gaols) {
      const order = 1 + gaols.findIndex(p => p.id === this.me.id)
      this.say(order ? `${order}번째` : gaols.map(p => p.job.getName(this.sayType)).join(' '))
      
      this.clearTiles()
      gaols.forEach(async p => this.app.appendChild(await this.getTile(p.job)))
      console.log('gaols updated', gaols)
    }
  }
}