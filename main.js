const JOB_NAMES = {
  19: ['PLD', 'Paladin', '나이트', '나이트', '나'],
  20: ['MNK', 'Monk', '몽크', '몽크', '몽'],
  21: ['WAR', 'Warrior', '전사', '전사', '전'],
  22: ['DRG', 'Dragoon', '용기사', '용기사', '용'],
  23: ['BRD', 'Bard', '음유시인', '음유', '음'],
  24: ['WHM', 'White Mage', '백마도사', '백마', '백'],
  25: ['BLM', 'Black Mage', '흑마도사', '흑마', '흑'],
  27: ['SMN', 'Summoner', '소환사', '솬사', '솬'],
  28: ['SCH', 'Scholar', '학자', '학자', '학'],
  30: ['NIN', 'Ninja', '닌자', '닌자', '닌'],
  31: ['MCH', 'Machinist', '기공사', '기공', '기'],
  32: ['DRK', 'Dark Knight', '암흑기사', '암기', '암'],
  33: ['AST', 'Astrologian', '점성술사', '점성', '점'],
  34: ['SAM', 'Samurai', '사무라이', '사무', '사'],
  35: ['RDM', 'Red Mage', '적마도사', '적마', '적'],
  37: ['GNB', 'Gunbreaker', '건브레이커', '건브', '건'],
  38: ['DNC', 'Dancer', '무도가', '무도가', '무']
}

const JOB_NAME_TYPES = {
  DEFAULT: 0,
  ENGLISH: 1,
  KOREAN: 2,
  KOREAN_SHORT: 3,
  KOREAN_SHORTEST: 4
}

const JOB_CODES = {}
Object.entries(JOB_NAMES).forEach(([code, names]) =>
  names.forEach(name => (JOB_CODES[name] = parseInt(code, 10))))

// 암전건나용사몽닌음기무흑솬적백점학
const DEFAULT_PRIORITY = [32, 21, 37, 19, 22, 34, 20, 30, 23, 31, 38, 25, 27, 35, 24, 33, 28]

class TitalJail {
  me = null
  party = []
  gaols = []
  timeout = 0
  priority = null

  constructor () {
    this.priority = JSON.parse(localStorage.getItem('priority')) || DEFAULT_PRIORITY

    this.addOverlayListener('LogLine')
    this.addOverlayListener('PartyChanged')
    this.addOverlayListener('ChangePrimaryPlayer')
    window.startOverlayEvents()
  }

  addOverlayListener (type) {
    window.addOverlayListener(type, this[`on${type}`].bind(this))
  }

  say (opts) {
    if (typeof opts === 'string') return this.say({ text: opts, lang: 'ko', speed: 0.6 })
    return new Audio(`https://www.google.com/speech-api/v1/synthesize?${new URLSearchParams(opts)}`).play()
  }

  onChangePrimaryPlayer ({ charID, charName }) {
    this.me = {
      name: charName,
      id: charID.toString(16)
    }
  }

  onPartyChanged ({ party }) {
    this.party = party.filter(p => p.inParty && p.job in JOB_NAMES)
  }

  onLogLine ({ line, rawLine }) {
    const m = /.+?:2B6[BC]:.+?:([0-9A-F]+?):/.exec(rawLine.replace(/\|/g, ':'))
    if (m !== null) return this.onGaol(this.party.find(p => p.id === m[1]))
    if (line[0] === '00' && line[2] === '0038') return this.onEcho(line[4])
  }

  onEcho (message) {
    const args = message.split(' ')
    if (args[0] !== '돌감옥') return

    if (args.length > 1) {
      this.priority = [...args[1]].map(n => JOB_CODES[n]).filter(c => c)
      localStorage.setItem('priority', JSON.stringify(this.priority))
    }

    const text = this.priority.map(c => JOB_NAMES[c][JOB_NAME_TYPES.KOREAN])
    this.say(`현재 설정된 돌감옥 우선순위는 ${text.join(', ')}입니다.`)
  }

  onGaol (target) {
    if (!target) return
    if (Date.now() - this.timeout > 1000) this.gaols = []

    this.gaols.push(target)
    this.timeout = Date.now()
    if (this.gaols.length !== 3) return

    this.gaols.sort((a, b) => this.priority.indexOf(a.job) - this.priority.indexOf(b.job))
    const order = this.gaols.findIndex(p => p.id === this.me.id)

    if (order > -1) return this.say(`${order + 1}번째`)
    else this.say(this.gaols.map(p => JOB_NAMES[p.job][JOB_NAME_TYPES.KOREAN_SHORT]).join(' '))
  }
}

const titan = new TitalJail()
console.log('TitanJail loaded', titan)
