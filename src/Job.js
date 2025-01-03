const data = [
  [19, 'tank', 'PLD', 'Paladin', 'ナイト', '나이트', '나이트', '나', 'paladin'],
  [20, 'melee', 'MNK', 'Monk', 'モンク', '몽크', '몽크', '몽', 'monk'],
  [21, 'tank', 'WAR', 'Warrior', '戦士', '전사', '전사', '전', 'warrior'],
  [22, 'melee', 'DRG', 'Dragoon', '竜騎士', '용기사', '용기사', '용', 'dragoon'],
  [23, 'ranged', 'BRD', 'Bard', '吟遊詩人', '음유시인', '음유', '음', 'bard'],
  [24, 'healer', 'WHM', 'White Mage', '白魔道士', '백마도사', '백마', '백', 'whitemage'],
  [25, 'caster', 'BLM', 'Black Mage', '黒魔道士', '흑마도사', '흑마', '흑', 'blackmage'],
  [27, 'caster', 'SMN', 'Summoner', '召喚士', '소환사', '솬사', '솬', 'summoner'],
  [28, 'healer', 'SCH', 'Scholar', '学者', '학자', '학자', '학', 'scholar'],
  [30, 'melee', 'NIN', 'Ninja', '忍者', '닌자', '닌자', '닌', 'ninja'],
  [31, 'ranged', 'MCH', 'Machinist', '機工士', '기공사', '기공', '기', 'machinist'],
  [32, 'tank', 'DRK', 'Dark Knight', '暗黒騎士', '암흑기사', '암기', '암', 'darkknight'],
  [33, 'healer', 'AST', 'Astrologian', '占星術師', '점성술사', '점성', '점', 'astrologian'],
  [34, 'melee', 'SAM', 'Samurai', '侍', '사무라이', '사무', '사', 'samurai'],
  [35, 'caster', 'RDM', 'Red Mage', '赤魔道士', '적마도사', '적마', '적', 'redmage'],
  [37, 'tank', 'GNB', 'Gunbreaker', 'ガンブレイカー', '건브레이커', '건브', '건', 'gunbreaker'],
  [38, 'ranged', 'DNC', 'Dancer', '踊り子', '무도가', '무도가', '무', 'dancer'],
  [39, 'melee', 'RPR', 'Reaper', 'リーパー', '리퍼', '리퍼', '리', 'reaper'],
  [40, 'healer', 'SGE', 'Sage', '賢者', '현자', '현자', '현', 'sage'],
  [41, 'melee', 'VPR', 'Viper', 'ヴァイパー', '바이퍼', '바이퍼', '바', 'vpr'],
  [42, 'caster', 'PCT', 'Pictomancer', 'ピクトマンサー', '픽토맨서', '픽토', '픽', 'pct'],
]

class Job {
  code = 0
  role = 'none'
  names = []

  constructor (code, role, names) {
    this.code = code
    this.role = role
    this.names = names
  }

  isTank () { return this.role === 'tank' }
  isHealer () { return this.role === 'healer' }
  isDps () { return ['melee', 'ranged', 'caster'].some(this.role) }

  getName (nameType = Job.NameTypes.DEFAULT) {
    if (nameType === Job.NameTypes.XIVAPI) {
      return this.names[Job.NameTypes.XIVAPI]
    }

    if (nameType === 'en') nameType = Job.NameTypes.ENGLISH
    if (nameType === 'jp') nameType = Job.NameTypes.JAPANESE
    if (nameType === 'ko') nameType = Job.NameTypes.KOREAN
    return this.names[nameType]
  }
}

Job.fromCode = code =>
  Job.instances.find(job => job.code === parseInt(code, 10))

Job.fromName = name =>
  Job.instances.find(job => job.names.some(n => n.toUpperCase() === name.toUpperCase()))

Job.NameTypes = {
  DEFAULT: 0,
  ENGLISH: 1,
  JAPANESE: 2,
  KOREAN: 3,
  KOREAN_SHORT: 4,
  KOREAN_SHORTEST: 5,
  XIVAPI: 6
}

Job.instances = []
data.forEach(([code, role, ...names]) =>
  Job.instances.push(new Job(code, role, names)))

export default Job
