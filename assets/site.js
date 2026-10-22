/* === Kim Ji-won Collection Cabinet === */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Collection data ---------- */
  var CATS = {
    all:       { zh: '全部', ko: 'ALL' },
    char:      { zh: '角色剧照', ko: 'CHARACTERS' },
    close:     { zh: '情绪特写', ko: 'CLOSE-UP' },
    magazine:  { zh: '杂志写真', ko: 'MAGAZINE' },
    award:     { zh: '颁奖活动', ko: 'EVENTS' },
    campaign:  { zh: '品牌广告', ko: 'CAMPAIGNS' },
    life:      { zh: '日常街拍', ko: 'MOMENTS' },
    show:      { zh: '综艺时刻', ko: 'SHOW' },
    airport:   { zh: '机场时尚', ko: 'AIRPORT' }
  };

  /* 全部图片均为金智媛本人单人照；title/sub/desc/meta/src 等文字字段仅作数据档案保留，页面不再展示（此前配文与实际照片内容存在出入） */
  var ITEMS = [
    // —— 角色剧照 ——
    { cat:'char', feat:true, title:'洪海仁 · 百货女王', sub:'《眼泪女王》눈물의 여왕 · 2024', img:'char_qot.jpg', desc:'深色西装、毫不退让的眼神——洪海仁把 Queens 百货握在手里，也把自己的婚姻推到悬崖边。大结局以 24.85% 登顶 tvN 历代第一。', meta:{ 出品:'tvN', 角色:'洪海仁 (홍해인)', 年份:'2024', 收视:'24.85%' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'char', title:'洪海仁 · 黑裙', sub:'《眼泪女王》눈물의 여왕 · 剧照', img:'char_qot2.jpg', desc:'黑色礼服、垂落的卷发，洪海仁在剧中最锋利也最疲惫的一面——眼泪女王的「女王」二字，靠这场戏立住。', meta:{ 出品:'tvN', 角色:'洪海仁', 类型:'剧照' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'char', feat:true, title:'廉美贞 · 崇拜我吧', sub:'《我的解放日志》나의 해방일지 · 2022', img:'char_liberty.jpg', desc:'「崇拜我吧」——京畿道乡下的通勤女孩廉美贞安静、钝痛、无处可去，却成为那一年最多人共情的角色，并带来第 59 届百想最佳女主角提名。', meta:{ 出品:'JTBC', 角色:'廉美贞 (염미정)', 年份:'2022' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'char', title:'尹明珠 · 军医', sub:'《太阳的后裔》태양의 후예 · 2016', img:'char_dots.jpg', desc:'军帽下的尹明珠，是那年最出圈的国民军医。她与徐大英组成的「救援CP」红遍亚洲，大结局收视 38.8%。', meta:{ 出品:'KBS2', 角色:'尹明珠 (윤명주)', 年份:'2016', 收视:'38.8%' }, src:'腾讯视频 v.qq.com' },
    { cat:'char', title:'尹明珠 · 贝雷帽', sub:'《太阳的后裔》태양의 후예 · 造型照', img:'char_dots2.jpg', desc:'贝雷帽、军装与军牌——这套造型几乎定义了 2016 年韩剧女主的气场。', meta:{ 出品:'KBS2', 角色:'尹明珠', 类型:'造型照' }, src:'堆糖 duitang.com' },
    { cat:'char', title:'廉美贞 · 夜班回家', sub:'《我的解放日志》나의 해방일지 · 剧照', img:'char_liberty2.jpg', desc:'下班后的车厢、无声的疲惫——解放日志里最常出现的场景，也是廉美贞最真实的样子。', meta:{ 出品:'JTBC', 角色:'廉美贞', 类型:'剧照' }, src:'win4000.com' },
    { cat:'char', title:'刘瑞赫 · 帝国高中', sub:'《继承者们》상속자들 · 2013', img:'char_heirs.jpg', desc:'校服与冷脸，是刘瑞赫留给观众的第一印象：高傲的财阀继承女，把所有脆弱都藏在制服背后。金智媛凭此角获 SBS 演技大赏 New Star 奖。', meta:{ 出品:'SBS', 角色:'刘瑞赫 (유라헬)', 年份:'2013' }, src:'百度知道 zhidao.baidu.com' },
    { cat:'char', title:'刘瑞赫 · 制服近景', sub:'《继承者们》상속자들 · 剧照', img:'char_heirs2.jpg', desc:'齐刘海、领结与淡漠的眼神——2013 年那个「小金泰熙」，就是从这个造型开始被记住的。', meta:{ 出品:'SBS', 角色:'刘瑞赫', 类型:'剧照' }, src:'今日头条 toutiao.com' },
    { cat:'char', title:'坦雅 · 部落少女', sub:'《阿斯达编年史》아스달 연대기 · 2019', img:'char_arthdal.jpg', desc:'花环、兽皮与泥地——史前大陆上的坦雅，是金智媛第一次离开都市剧的尝试，也让她完成了奇幻叙事的跨越。', meta:{ 出品:'tvN', 角色:'坦雅 (탄야)', 年份:'2019' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'char', title:'李恩梧 · 海边的尹善雅', sub:'《都市男女爱情法则》도시남녀의 사랑법 · 2020', img:'char_city.jpg', desc:'本我是平凡的都市女子，副我是海边纵情的尹善雅——这部剧让她把两种人生都活了一遍。', meta:{ 出品:'Kakao TV', 角色:'李恩梧 (이은오)', 年份:'2020' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'char', title:'崔爱拉 · 播报员', sub:'《三流之路》쌈 마이웨이 · 2017', img:'char_ffmw.jpg', desc:'主播梦不灭的崔爱拉，握着稿件站到话筒前。这是金智媛第一次担纲电视剧女主角，拿下 KBS 迷你剧女子优秀演技赏。', meta:{ 出品:'KBS2', 角色:'崔爱拉 (최애라)', 年份:'2017' }, src:'一点资讯 yidianzixun.com' },
    { cat:'char', title:'廉美贞 · 绿野侧影', sub:'《我的解放日志》나의 해방일지 · 片场', img:'char_liberty3.jpg', desc:'白上衣、长发被风吹起，山谷里的这一帧像极了廉美贞的周末：什么都不用做，就已经很好。', meta:{ 出品:'JTBC', 角色:'廉美贞', 类型:'片场花絮' }, src:'360 图搜 image.so.com' },
    { cat:'char', title:'洪海仁 · 心动一拍', sub:'《眼泪女王》눈물의 여왕 · 特写', img:'char_qot3.jpg', desc:'脸颊贴着一颗小小的爱心贴纸——眼泪女王难得的柔软瞬间，被镜头完整留住了。', meta:{ 出品:'tvN', 角色:'洪海仁', 类型:'剧照特写' }, src:'360 图搜 image.so.com' },
    { cat:'char', feat:true, title:'桂秀晶 · 白大褂', sub:'《Doctor X》· 2026 · tvN', img:'char_drx1.jpg', desc:'白大褂、听诊器与工牌——2026 年她交出的最新角色桂秀晶：一名不走寻常路的医生。新剧首集收视 11.4%，峰值 17.4%。', meta:{ 出品:'tvN', 角色:'桂秀晶 (계수정)', 类型:'剧照', 年份:'2026', 开播收视:'11.4%' }, src:'360 图搜 image.so.com' },
    { cat:'char', title:'Doctor X · 黄西装', sub:'《Doctor X》· 2026 · tvN', img:'char_drx2.jpg', desc:'姜黄色西装与黑色内搭——脱下白大褂之后的她，依然像在赶一场重要的会。', meta:{ 出品:'tvN', 类型:'剧照', 年份:'2026' }, src:'360 图搜 image.so.com' },
    { cat:'char', title:'Doctor X · 查房路上', sub:'《Doctor X》· 2026 · tvN', img:'char_drx3.jpg', desc:'白大褂与围巾，医院走廊的纵深处——查房路上的一个回眸，是新剧最好的预告。', meta:{ 出品:'tvN', 角色:'桂秀晶', 类型:'剧照', 年份:'2026' }, src:'360 图搜 image.so.com' },
    { cat:'char', title:'桂秀晶 · 手术服', sub:'《Doctor X》· 2026 · tvN', img:'char_drx4.jpg', desc:'黑色齐肩短发、蓝色手术服与听诊工牌——桂秀晶病房里的第一帧官方剧照。', meta:{ 出品:'tvN', 角色:'桂秀晶', 类型:'剧照', 年份:'2026' }, src:'360 图搜 image.so.com' },
    { cat:'char', title:'桂秀晶 · 医院走廊', sub:'《Doctor X》· 2026 · tvN', img:'char_drx5.jpg', desc:'白大褂里裹着羽绒服、手里抱着外套——医院走廊纵深处，走出了实习医生的日常感。', meta:{ 出品:'tvN', 角色:'桂秀晶', 类型:'剧照', 年份:'2026' }, src:'网易号 163.com' },

    // —— 情绪特写 ——
    { cat:'close', title:'哭戏 · 睫毛上的眼泪', sub:'《眼泪女王》· 名场面', img:'close_cry.jpg', desc:'没有嚎啕，只有忍着不掉的那一滴——金智媛的哭戏从不靠音量，靠呼吸。', meta:{ 类型:'剧照特写', 情绪:'哭戏' }, src:'微博 weibo.com' },
    { cat:'close', title:'逆光 · 侧脸', sub:'Close-up · 逆光', img:'close_backlit.jpg', desc:'逆光把轮廓磨成一条线，只留下睫毛和眼神。', meta:{ 类型:'特写', 光线:'逆光' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'close', title:'绿衣 · 出神', sub:'Close-up · 绿调', img:'close_green.jpg', desc:'绿衣、素颜感妆容、视线落在镜头之外——这是剧集之外的她。', meta:{ 类型:'特写', 色调:'绿调' }, src:'凤凰网 ifeng.com' },
    { cat:'close', title:'黑衣 · 凝视', sub:'Close-up · 低照度', img:'close_black.jpg', desc:'低照度下的一张脸，情绪全在眼睛里。', meta:{ 类型:'特写', 光线:'低照度' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'close', title:'侧脸 · 静止', sub:'Close-up · 侧脸', img:'close_side.jpg', desc:'几乎不动的一秒钟，是演员最难的表演。', meta:{ 类型:'特写', 角度:'侧脸' }, src:'抖音 douyin.com' },
    { cat:'close', title:'蓝调 · 近镜', sub:'Close-up · 蓝调', img:'close_blue.jpg', desc:'蓝调光下的近镜，皮肤质感与眼神都保留着。', meta:{ 类型:'近镜', 色调:'蓝调' }, src:'知乎专栏 zhuanlan.zhihu.com' },
    { cat:'close', title:'暗调 · 特写', sub:'Close-up · 暗调', img:'close_dark.jpg', desc:'暗背景、亮眼神，一张干净到几乎没有修饰的特写。', meta:{ 类型:'特写', 背景:'暗调' }, src:'堆糖 duitang.com' },
    { cat:'close', title:'笑 · 一秒', sub:'Close-up · 笑', img:'close_smile.jpg', desc:'剧里少见的松弛笑容，比任何台词都更有说服力。', meta:{ 类型:'特写', 情绪:'笑' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'close', title:'亮片 · 星光', sub:'Close-up · 亮片', img:'close_sparkle.jpg', desc:'黑色亮片在低光里只反射一点点光——近镜里，妆容干净得只剩下眼神。', meta:{ 类型:'特写', 造型:'亮片' }, src:'360 图搜 image.so.com' },
    { cat:'close', title:'齐刘海 · 凝视', sub:'Close-up · 齐刘海', img:'close_bangs.jpg', desc:'齐刘海遮住额头，注意力就全部落在眼睛上——美妆特写最标准的解法。', meta:{ 类型:'美妆特写', 造型:'齐刘海' }, src:'360 图搜 image.so.com' },
    { cat:'close', title:'托腮 · 慵懒', sub:'Close-up · 托腮', img:'close_lean.jpg', desc:'托腮、歪头、视线放空——不是表演，是镜头刚好路过的一秒。', meta:{ 类型:'特写', 姿态:'托腮' }, src:'360 图搜 image.so.com' },
    { cat:'close', title:'浅蓝 · 沉思', sub:'Close-up · 浅蓝', img:'close_blue2.jpg', desc:'浅蓝上衣配暗色家具，一张安静的室内特写。', meta:{ 类型:'特写', 色调:'浅蓝' }, src:'360 图搜 image.so.com' },

    // —— 杂志写真 ——
    { cat:'magazine', title:'Singles 封面', sub:'Singles · 杂志封面', img:'mag_singles.jpg', desc:'粉色背景、白色套装、双手插兜——杂志封面上的金智媛，是「冷都女」之外的另一种答案：松弛。', meta:{ 类型:'杂志封面', 刊物:'Singles', 风格:'粉色棚拍' }, src:'堆糖 duitang.com' },
    { cat:'magazine', title:'黑色礼服 · 珠宝大片', sub:'Editorial · 珠宝', img:'mag_black.jpg', desc:'黑色抹胸与细链珠宝，是她在红毯之外最常见的杂志造型：不靠颜色，靠骨骼。', meta:{ 类型:'时装大片', 风格:'黑色礼服' }, src:'街拍 jiepai.net' },
    { cat:'magazine', title:'玫瑰与侧脸', sub:'Editorial · 玫瑰', img:'mag_rose.jpg', desc:'一支红玫瑰挡在脸侧，眼神越过花朵看向镜头——这是她少有的浓烈造型。', meta:{ 类型:'时装大片', 风格:'玫瑰特写' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'magazine', title:'特写 · 近镜', sub:'Beauty · 近镜特写', img:'mag_closeup.jpg', desc:'没有台词、没有角色，只有一张近镜——这也是收藏她最直接的理由。', meta:{ 类型:'美妆特写', 画幅:'近镜' }, src:'百度移动 mbd.baidu.com' },
    { cat:'magazine', title:'官方形象照', sub:'Profile · 艺人档案', img:'mag_soft.jpg', desc:'黑色上衣、长发垂落、直视镜头——艺人档案照最标准的拍法，没有角色，只有本人。', meta:{ 类型:'官方形象照', 用途:'艺人档案', 画幅:'竖版' }, src:'抖音 douyin.com' },
    { cat:'magazine', title:'白裙 · 窗边', sub:'Editorial · 棚拍', img:'mag_white2.jpg', desc:'白色连衣裙落在窗边的自然光里，是品牌画报最常见的温柔一拍。', meta:{ 类型:'时装大片', 风格:'自然光' }, src:'公开网络图集' },
    { cat:'magazine', title:'灰调 · 长直发', sub:'Editorial · 灰调', img:'mag_gray.jpg', desc:'深灰上衣与长直发，一张几乎没有颜色的肖像——反而最耐看。', meta:{ 类型:'杂志写真', 风格:'极简灰调' }, src:'360 图搜 image.so.com' },
    { cat:'magazine', title:'奶油色 · 套装', sub:'Editorial · 奶油色', img:'mag_cream.jpg', desc:'奶油色套装与明亮室内，柔和得像一页摊开的杂志内页。', meta:{ 类型:'时装大片', 风格:'奶油色系' }, src:'360 图搜 image.so.com' },
    { cat:'magazine', title:'背带裤 · 橙底', sub:'Editorial · 高饱和', img:'mag_overall.jpg', desc:'橙色背景是最冒险的布光——也只有足够干净的五官，才敢这么拍。', meta:{ 类型:'杂志写真', 风格:'高饱和棚拍' }, src:'360 图搜 image.so.com' },
    { cat:'magazine', title:'皮衣 · 街头', sub:'Editorial · 皮衣', img:'mag_leather.jpg', desc:'黑色皮衣与浅色牛仔裤——杂志里最「帅」的一次尝试。', meta:{ 类型:'时装大片', 风格:'皮衣' }, src:'360 图搜 image.so.com' },
    { cat:'magazine', title:'山坡 · 蓝大衣', sub:'Editorial · 外景', img:'mag_hill.jpg', desc:'蓝色系带大衣、白色帽子、山坡与栏杆——外景大片的教科书构图。', meta:{ 类型:'杂志外景', 造型:'蓝大衣+白帽' }, src:'360 图搜 image.so.com' },
    { cat:'magazine', title:'白衬衫 · 黑领带', sub:'Editorial · 2025 · 棚拍', img:'mag_tie.jpg', desc:'白衬衫黑领带，抬手碰了碰头发——2025 年棚拍里的知性一帧。', meta:{ 类型:'杂志写真', 造型:'白衬衫+黑领带', 年份:'2025' }, src:'360 图搜 image.so.com' },
    { cat:'magazine', title:'解扣白衬衫', sub:'Editorial · 2025 · 棚拍', img:'mag_open.jpg', desc:'白衬衫解开一粒扣、一条细项链，手握着衣领——比封面更松弛的画报内页感。', meta:{ 类型:'杂志写真', 造型:'白衬衫+项链', 年份:'2025' }, src:'360 图搜 image.so.com' },
    { cat:'magazine', title:'吊带裙 · 白开衫', sub:'Editorial · 2025 · 棚拍', img:'mag_slip.jpg', desc:'黑色吊带裙配白色开衫的全身造型——优雅到可以直接进 lookbook。', meta:{ 类型:'时装大片', 造型:'吊带裙+白开衫', 年份:'2025' }, src:'360 图搜 image.so.com' },
    { cat:'magazine', title:'VOGUE Korea · 雕塑白', sub:'Vogue Korea · 画报', img:'mag_vogue1.jpg', desc:'白色雕塑感镂空上衣、齐刘海配低髻——Vogue Korea 镜头下最冷冽的一帧。', meta:{ 类型:'杂志画报', 刊物:'VOGUE Korea' }, src:'微博 weibo.com' },
    { cat:'magazine', title:'VOGUE Digital · 指尖', sub:'Vogue Korea · Digital Cover', img:'mag_vogue2.jpg', desc:'VOGUE digital edition 封面——粉蓝撞色美甲贴在脸侧的美妆特写。', meta:{ 类型:'杂志封面', 刊物:'VOGUE Korea Digital' }, src:'微博 weibo.com' },
    { cat:'magazine', title:'BAZAAR · 绣球花', sub:'Harper&rsquo;s BAZAAR Korea · 画报', img:'mag_bazaar.jpg', desc:'藏青色刺绣外套抱着蓝紫绣球花束——BAZAAR 蓝调到底的画报。', meta:{ 类型:'杂志画报', 刊物:'Harper\u2019s BAZAAR Korea' }, src:'微博 weibo.com' },
    { cat:'magazine', title:'嘉人 · 皮衣牛仔', sub:'Marie Claire · 七月刊', img:'mag_marie7.jpg', desc:'棕色皮夹克、白色短打与高腰牛仔——嘉人七月刊里最松弛的一套。', meta:{ 类型:'杂志画报', 刊物:'Marie Claire 嘉人', 年份:'2024' }, src:'人民看点 360kuai.com' },
    { cat:'magazine', title:'嘉人 · 花絮一帧', sub:'Marie Claire · 三月刊 · 花絮', img:'mag_marie24.jpg', desc:'浅紫雪纺高领、手贴脸颊——嘉人三月刊拍摄现场的花絮一帧。', meta:{ 类型:'拍摄花絮', 刊物:'Marie Claire 嘉人', 年份:'2024' }, src:'百度 baidu.com' },
    { cat:'magazine', title:'Cosmo · 工装裙', sub:'Cosmopolitan Korea · 五月刊', img:'mag_cosmo24.jpg', desc:'橄榄绿工装连体裙、金属手袋里插着一把花——Cosmo 五月刊的怪趣一帧。', meta:{ 类型:'杂志画报', 刊物:'Cosmopolitan Korea', 年份:'2024' }, src:'百度 baidu.com' },
    { cat:'magazine', title:'Noblesse · 新品画报', sub:'Noblesse · 品牌画报', img:'mag_noblesse.jpg', desc:'浅紫雪纺衫、金色耳饰与焦糖色手袋——Noblesse 镜头前的安静陈列。', meta:{ 类型:'杂志画报', 刊物:'Noblesse' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'magazine', title:'SALT · 蓝底白裙', sub:'Official · 经纪公司宣传照', img:'mag_salt.jpg', desc:'青蓝渐变底、双手比花——经纪公司官方宣传照里明度最高的一张。', meta:{ 类型:'官方宣传照', 机构:'SALT Entertainment' }, src:'百度 baidu.com' },

    // —— 颁奖活动 ——
    { cat:'award', title:'百想红毯', sub:'백상예술대상 · 红毯', img:'award_redcarpet.jpg', desc:'红毯上的白色礼服与挥手，是颁奖季最容易被记住的三秒钟。', meta:{ 场合:'百想艺术大赏', 类型:'红毯' }, src:'360快传 360kuai.com' },
    { cat:'award', title:'活动现场 · 米白套装', sub:'Event · 发布会', img:'award_whitedress.jpg', desc:'米白套装配长发，站姿放松——发布会现场的她，比红毯更像本人。', meta:{ 类型:'发布会', 造型:'米白套装' }, src:'堆糖 duitang.com' },
    { cat:'magazine', title:'蓝V领 · 官方宣传照', sub:'Profile · 官方宣传', img:'award_event.jpg', desc:'纯白棚拍里的蓝色 V 领造型——没有媒体墙、没有背板，只有干净的光。', meta:{ 类型:'官方宣传照', 造型:'蓝色V领' }, src:'堆糖 duitang.com' },
    { cat:'magazine', title:'黑西装 · 金属环', sub:'Official · 官方概念照', img:'award_stage.jpg', desc:'黑西装与金属环点缀——经纪公司官方概念照里最利落的一帧。', meta:{ 类型:'官方概念照', 造型:'黑西装' }, src:'百度移动 mbd.baidu.com' },
    { cat:'award', title:'白裙 · 站台', sub:'Event · 品牌站台', img:'award_white2.jpg', desc:'白色长裙与背后的活动布景，是她在正式场合最常用的一套语言。', meta:{ 类型:'品牌活动', 造型:'白色长裙' }, src:'百度移动 mbd.baidu.com' },
    { cat:'award', title:'SBS 演技大赏 · 西装', sub:'2025 SBS 演技大赏 · 颁奖台', img:'award_sbs25a.jpg', desc:'黑色深V西装与蓝紫宝石——2025 年 SBS 演技大赏颁奖台上的短发剪影。', meta:{ 场合:'2025 SBS 演技大赏', 类型:'颁奖礼', 年份:'2025' }, src:'微博 weibo.com' },
    { cat:'award', title:'SBS 演技大赏 · 致辞', sub:'2025 SBS 演技大赏 · 颁奖台', img:'award_sbs25b.jpg', desc:'手持信封、对着双麦发言——同场的另一帧。', meta:{ 场合:'2025 SBS 演技大赏', 类型:'颁奖礼', 年份:'2025' }, src:'微博 weibo.com' },
    { cat:'award', title:'tvN 发布会 · 黑礼服', sub:'Press · 新剧发布会', img:'award_press26.jpg', desc:'一字肩黑礼服站在 tvN 媒体墙前——新剧发布会上的标准一帧。', meta:{ 场合:'tvN 新剧发布会', 类型:'发布会' }, src:'百度 baidu.com' },
    { cat:'award', title:'首次粉丝见面会 · be my One', sub:'Fanmeeting · be my One · 2024.06.22', img:'award_fanmeet24.jpg', desc:'2024 年 6 月 22 日，出道后首次个人粉丝见面会「be my One」官方海报。', meta:{ 场合:'首次个人粉丝见面会', 类型:'官方海报', 日期:'2024.06.22', 场馆:'신한카드 SOL페이 스퀘어 라이브홀' }, src:'微博 weibo.com' },
    { cat:'award', title:'Dior 活动', sub:'Event · 品牌活动', img:'award_dior.jpg', desc:'黑色长裙、手袋、品牌背板——时装屋活动的她，把「冷」穿成了礼貌。', meta:{ 类型:'品牌活动', 品牌:'Dior', 造型:'黑色长裙' }, src:'微博 weibo.com' },
    { cat:'award', title:'采访 · 话筒', sub:'Press · 媒体采访', img:'award_mic.jpg', desc:'灰色西装、一支话筒——宣传期每天重复几十次的动作，她每一次都像第一次那样认真。', meta:{ 类型:'媒体活动', 造型:'灰色西装' }, src:'360 图搜 image.so.com' },
    { cat:'award', title:'黑西装 · 站立', sub:'Event · 品牌活动', img:'award_blazer.jpg', desc:'黑西装与白衬衫的叠穿，站着受访的三分钟——比例好到不需要摆姿势。', meta:{ 类型:'品牌活动', 造型:'黑西装' }, src:'360 图搜 image.so.com' },
    { cat:'award', title:'粉裙 · 台上', sub:'Stage · 颁奖礼', img:'award_stage2.jpg', desc:'粉色蕾丝裙站在暗色舞台上，一支话筒、一束追光——颁奖礼最标准的画面。', meta:{ 类型:'颁奖礼', 造型:'粉色蕾丝裙' }, src:'360 图搜 image.so.com' },
    { cat:'award', feat:true, title:'百想红毯 · 白蕾丝', sub:'백상예술대상 · 红毯 · 2024', img:'award_baeksang1.jpg', desc:'白色蕾丝高领礼服、双手交叠——凭《眼泪女王》走上百想红毯的那一晚，她把自己走成了背景板里最亮的一帧。', meta:{ 场合:'百想艺术大赏', 类型:'红毯', 造型:'白色蕾丝礼服', 年份:'2024' }, src:'360 图搜 image.so.com' },
    { cat:'award', title:'百想红毯 · 挥手', sub:'백상예술대상 · 红毯 · 2024', img:'award_baeksang2.jpg', desc:'同一条白蕾丝礼服，抬手向镜头挥了挥——红毯上的三秒钟，被记成了很多年。', meta:{ 场合:'百想艺术大赏', 类型:'红毯', 造型:'白色蕾丝礼服', 年份:'2024' }, src:'360 图搜 image.so.com' },
    { cat:'award', title:'Dior 活动 · 斜肩黑裙', sub:'Dior · 品牌活动 · 2024', img:'award_dior2.jpg', desc:'黑色斜肩长裙与老花手袋，在 Dior 活动背板前挥手——时装屋的场合，她把礼貌穿成了风格。', meta:{ 类型:'品牌活动', 品牌:'Dior', 造型:'黑色斜肩长裙', 年份:'2024' }, src:'360 图搜 image.so.com' },

    // —— 品牌广告 ——
    { cat:'campaign', title:'Dr.G 代言', sub:'Dr.G · 护肤品牌', img:'camp_drg.jpg', desc:'护肤品牌 Dr.G 的代言画面：干净的底妆、直白的眼神，广告里她只需要证明一件事——皮肤好。', meta:{ 品牌:'Dr.G', 品类:'护肤', 类型:'代言广告' }, src:'堆糖 duitang.com' },
    { cat:'campaign', title:'Paul Hueman 眼镜', sub:'Paul Hueman · 眼镜广告', img:'camp_paulhueman.jpg', desc:'墨镜压住半张脸，剩下的半张负责高级感——眼镜品牌的广告向来只需要这个角度。', meta:{ 品牌:'Paul Hueman', 品类:'眼镜', 类型:'代言广告' }, src:'堆糖 duitang.com' },
    { cat:'campaign', title:'牛仔系列画报', sub:'Denim · 品牌画报', img:'camp_denim.jpg', desc:'浅色牛仔外套与白 T，棚拍背景干净——这是她最日常、也最带货的一套造型。', meta:{ 类型:'品牌画报', 风格:'牛仔' }, src:'堆糖 duitang.com' },
    { cat:'magazine', title:'镂空针织 · 概念照', sub:'Official · 官方概念照', img:'camp_editorial.jpg', desc:'镂空针织与暖调侧光——官方概念照里最柔软的一版。', meta:{ 类型:'官方概念照', 造型:'镂空针织' }, src:'新浪 k.sina.com.cn' },
    { cat:'campaign', title:'浅色牛仔 · 二号棚拍', sub:'Denim · 品牌画报', img:'camp_denim2.jpg', desc:'浅色牛仔外套的第二次棚拍——同一件外套，另一种光。', meta:{ 类型:'品牌画报', 风格:'浅色牛仔' }, src:'360 图搜 image.so.com' },
    { cat:'campaign', title:'咖啡 · 侧影', sub:'Campaign · 咖啡馆', img:'camp_coffee.jpg', desc:'牛仔外套、一杯咖啡、侧脸对着窗——广告里最会讲生活感的一次。', meta:{ 类型:'品牌画报', 场景:'咖啡馆' }, src:'360 图搜 image.so.com' },
    { cat:'campaign', title:'粉色开衫 · 店头', sub:'Retail · 商业画报', img:'camp_twice.jpg', desc:'粉色开衫坐在商品陈列旁——商业空间里也能拍出柔软的一帧。', meta:{ 类型:'商业画报', 造型:'粉色开衫' }, src:'360 图搜 image.so.com' },
    { cat:'campaign', title:'蓝 Polo · 休闲', sub:'Campaign · 2025 · 广告', img:'camp_polo.jpg', desc:'蓝 Polo 与黑短裙的坐姿——休闲品牌广告里最有活力的一版。', meta:{ 类型:'品牌广告', 造型:'蓝Polo+黑短裙', 年份:'2025' }, src:'360 图搜 image.so.com' },
    { cat:'campaign', title:'香槟抹胸 · 托腮', sub:'Campaign · 2025 · 广告', img:'camp_charm.jpg', desc:'香槟色抹胸与托腮的姿势——美妆广告里最柔和的一帧。', meta:{ 类型:'美妆广告', 造型:'香槟色抹胸', 年份:'2025' }, src:'360 图搜 image.so.com' },
    { cat:'campaign', title:'放大镜 · 创意', sub:'Campaign · 2025 · 广告', img:'camp_loupe.jpg', desc:'黑抹胸配一支放大镜道具——创意广告把「看得更细」拍成了悬念。', meta:{ 类型:'品牌广告', 造型:'黑抹胸', 道具:'放大镜', 年份:'2025' }, src:'360 图搜 image.so.com' },
    { cat:'campaign', title:'托腮 · 触唇', sub:'Campaign · 2025 · 广告', img:'camp_touch.jpg', desc:'白衬衫、托腮、指尖轻触嘴唇——美妆广告的经典构图，她拍出了俏皮的版本。', meta:{ 类型:'美妆广告', 造型:'白衬衫', 年份:'2025' }, src:'360 图搜 image.so.com' },
    { cat:'campaign', title:'白色连帽外套', sub:'Campaign · 2025 · 广告', img:'camp_hoodie.jpg', desc:'白色连帽外套半拉开链——运动系广告里干净得像一页目录。', meta:{ 类型:'品牌广告', 造型:'连帽外套', 年份:'2025' }, src:'360 图搜 image.so.com' },
    { cat:'campaign', title:'THE WHOO · 专柜', sub:'Campaign · 品牌代言', img:'camp_whoo.jpg', desc:'黑色正装站在 THE WHOO 专柜前——高端美妆代言的官方物料，得体是唯一的关键词。', meta:{ 类型:'品牌代言', 品牌:'THE WHOO', 场景:'专柜' }, src:'360 图搜 image.so.com' },
    { cat:'campaign', title:'Duvetica · 蓝POLO', sub:'Duvetica · SS 代言画报', img:'camp_duvetica25.jpg', desc:'皇家蓝 POLO 衫、黑短裙与品牌膝上袜——Duvetica 品牌大使的春夏画报。', meta:{ 类型:'品牌代言', 品牌:'Duvetica', 场景:'棚拍' }, src:'新浪 sina.com.cn' },
    { cat:'campaign', title:'羽绒服 · 奶油白', sub:'Duvetica · Lookbook', img:'camp_look26.jpg', desc:'奶油白菱格羽绒服配夏日凉鞋——冬夏混搭的 lookbook 式全身照。', meta:{ 类型:'品牌画报', 品牌:'Duvetica' }, src:'微博 weibo.com' },
    { cat:'campaign', title:'羽绒服 · 亮面黑', sub:'Official · 经纪公司物料', img:'camp_puffer26.jpg', desc:'黑色亮面羽绒服与齐刘海——经纪公司 High Zium 官方发布的画报物料。', meta:{ 类型:'官方物料', 机构:'High Zium Studio' }, src:'百度 baidu.com' },
    { cat:'campaign', title:'黑抹胸 · 珠宝', sub:'Campaign · 2025 · 广告', img:'camp_jewel.jpg', desc:'黑抹胸配全套珠宝，纯白背景——珠宝广告只需要两个元素：黑与光。', meta:{ 类型:'珠宝广告', 造型:'黑抹胸', 年份:'2025' }, src:'360 图搜 image.so.com' },

    // —— 日常街拍 ——
    { cat:'life', title:'综艺 · 比心', sub:'Variety · 综艺花絮', img:'life_variety.jpg', desc:'综艺里的她比剧里爱笑得多：比心、眯眼、被逗到笑出声。', meta:{ 类型:'综艺花絮', 画幅:'横版' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'life', title:'楼梯间的抓拍', sub:'Street · 抓拍', img:'life_stairs.jpg', desc:'长风衣、扶手电梯、回头的一瞬——被路人镜头留住的她，往往比精修图更让人心动。', meta:{ 类型:'街拍', 场景:'扶手电梯' }, src:'抖音 douyin.com' },
    { cat:'magazine', title:'红毛衣 · W Korea', sub:'W Korea · 画报', img:'life_redcoat.jpg', desc:'红色高领毛衣与黑色外套——W Korea 画报里冬天最衬她的配色。', meta:{ 刊物:'W Korea', 类型:'杂志画报', 造型:'红色毛衣' }, src:'百家号 baijiahao.baidu.com' },
    { cat:'life', title:'绿色毛衣 · 室内', sub:'Daily · 室内', img:'life_green.jpg', desc:'草绿色毛衣、双手托脸——这张几乎没有妆感的照片，被粉丝当成「最像本人」的一张。', meta:{ 类型:'日常照', 色调:'绿' }, src:'百度移动 mbd.baidu.com' },
    { cat:'char', title:'草地 · 白裙侧影', sub:'《眼泪女王》· 剧集画面', img:'life_field.jpg', desc:'草地、白裙、侧身站着——剧集画面里被完整保留的一帧。', meta:{ 出品:'tvN', 类型:'剧集画面', 场景:'草地' }, src:'哔哩哔哩 bilibili.com' },
    { cat:'life', title:'浅蓝针织', sub:'Daily · 浅蓝', img:'life_cardigan.jpg', desc:'浅蓝针织外套与白 T，最普通的日常穿搭，反而最耐看。', meta:{ 类型:'日常照', 色调:'浅蓝' }, src:'百度移动 mbd.baidu.com' },
    { cat:'magazine', title:'浅蓝西装 · 托腮', sub:'W Korea · 画报', img:'life_table.jpg', desc:'浅蓝西装与木桌，托腮的一帧 W Korea 画报——把日常感拍成了内页。', meta:{ 刊物:'W Korea', 类型:'杂志画报', 造型:'浅蓝西装' }, src:'公开网络图集' },
    { cat:'char', title:'图纸墙 · 持笔', sub:'Drama · 剧照置景', img:'life_lookup.jpg', desc:'设计图纸墙前持笔抬头的一秒——剧组的置景，骗过了所有人的眼睛。', meta:{ 类型:'剧照', 场景:'置景' }, src:'360 图搜 image.so.com' },
    { cat:'life', title:'街头 · 比心', sub:'Street · 比心', img:'life_heart.jpg', desc:'黑色外套站在街边，双手比出一个心——给镜头，也给看照片的人。', meta:{ 类型:'街拍', 动作:'比心' }, src:'360 图搜 image.so.com' },
    { cat:'magazine', title:'荷叶边 · 棚拍', sub:'Editorial · 棚拍', img:'life_ruffle.jpg', desc:'奶油色荷叶边衬衫与木桌置景——棚拍画报里最松弛的一版。', meta:{ 类型:'时装大片', 造型:'荷叶边衬衫' }, src:'360 图搜 image.so.com' },
    { cat:'life', title:'白墙 · 咖啡', sub:'Street · 白墙', img:'life_wall.jpg', desc:'牛仔外套、一杯咖啡、一面白墙——不用滤镜也好看的组合。', meta:{ 类型:'街拍', 场景:'咖啡馆' }, src:'360 图搜 image.so.com' },
    { cat:'char', title:'餐桌 · 侧望', sub:'Drama · 餐桌置景', img:'life_drinks.jpg', desc:'灰衬衫坐在餐桌旁，视线落在镜头之外——布景餐桌上的「日常」，其实是表演。', meta:{ 类型:'剧照', 场景:'餐桌置景' }, src:'360 图搜 image.so.com' },
    { cat:'magazine', title:'条纹衬衫 · 置景', sub:'Editorial · 置景棚拍', img:'life_striped.jpg', desc:'oversized 条纹衬衫与置景布光——画报镜头里的「客厅」，其实并不在谁家。', meta:{ 类型:'杂志写真', 造型:'oversized 条纹衫' }, src:'360 图搜 image.so.com' },

    // —— 综艺时刻 ——
    { cat:'show', title:'综艺 · 麻花辫', sub:'Variety · 2024 宣传期', img:'show_01.jpg', desc:'侧编麻花辫配双手合十的期待表情——2024 年《眼泪女王》宣传期综艺里，被字幕组印上「오늘의 한 입 간식은?」的一帧。', meta:{ 类型:'综艺截图', 年份:'2024' }, src:'新浪 sina.com.cn' },

    // —— 机场时尚 ——
    { cat:'airport', title:'机场 · 全黑造型', sub:'Airport · 全黑', img:'airport_black.jpg', desc:'黑色外套、黑色手袋、素颜——机场是她最放松的秀场，也是最容易被拍到的场合。', meta:{ 类型:'机场时尚', 造型:'全黑' }, src:'百家号 baijiahao.baidu.com' },
    { cat:'airport', title:'机场 · 挥手', sub:'Airport · 出境', img:'airport_wave.jpg', desc:'白色上衣与挥手，被接机的镜头留住的礼貌瞬间。', meta:{ 类型:'机场时尚', 动作:'挥手' }, src:'百度移动 mbd.baidu.com' },
    { cat:'airport', title:'机场 · 蓝衬衫', sub:'Airport · 蓝色衬衫', img:'airport_blue.jpg', desc:'蓝色衬衫与黑色长裤，干净利落的机场造型。', meta:{ 类型:'机场时尚', 造型:'蓝衬衫' }, src:'百度移动 mbd.baidu.com' },
    { cat:'airport', title:'机场 · 全白与蜜蜂', sub:'Airport · 2024 · 出发', img:'airport_2024.jpg', desc:'全白套装拎着带蜜蜂挂坠的手袋——2024 年 10 月机场出发路上的一帧，包挂恰好呼应了站里的蜜蜂。', meta:{ 类型:'机场时尚', 造型:'全白', 年份:'2024' }, src:'微博 weibo.com' },
    { cat:'magazine', title:'棉服 · 黑沙发', sub:'Editorial · 棚拍', img:'airport_quilt.jpg', desc:'棕色绗缝棉服与黑沙发——白墙棚拍把「冬天的机场」还原成了一组置景。', meta:{ 类型:'杂志写真', 造型:'绗缝棉服' }, src:'360 图搜 image.so.com' }
  ];

  /* 放映厅视频：均为 bilibili 公开稿件，嵌入前已逐一核验真实存在 */
  var VIDEOS = [
    { bvid:'BV1yx4y1q74G', cover:'vid_03.jpg', dur:'12:54', title:'「人生角色大战」中字采访 · 首次粉丝见面会', up:'独爱黄亦玫', view:'6.4万' },
    { bvid:'BV19w4m1D7LC', cover:'vid_01.jpg', dur:'01:02', title:'【好日子】金智媛颜值向混剪合集', up:'KJ赖赖', view:'1562' },
    { bvid:'BV11PN4eXE6F', cover:'vid_05.jpg', dur:'07:55', title:'ELLE 封面拍摄 · 互动采访（中字）', up:'金智媛吧', view:'2.2万' },
    { bvid:'BV1VVoyYwETa', cover:'vid_06.jpg', dur:'06:22', title:'治愈向 · 走进廉美贞的世界', up:'-一丛浅色花-', view:'3407' },
    { bvid:'BV13XG16mEUb', cover:'vid_04.jpg', dur:'07:35', title:'Marie Claire 专访 · 新剧再等等就来啦', up:'嘤嘤嘤的迷妹', view:'6846' },
    { bvid:'BV1qE9RYoE4F', cover:'vid_02.jpg', dur:'03:43', title:'金智媛韩剧绝美瞬间混剪', up:'Is豆芽菜', view:'889' }
  ];

  /* ---------- 周边橱窗：八件想象中的周边（复用藏品影像，只展不卖） ---------- */
  var GOODS = [
    { type:'postcard', img:'char_qot.jpg',      name:'POSTCARD NO.101',   cap:'官方明信片' },
    { type:'polaroid', img:'close_smile.jpg',   name:'POLAROID NO.024',  cap:'拍立得' },
    { type:'ticket',   img:'char_liberty.jpg',  name:'TICKET NO.88',     cap:'首映礼票根' },
    { type:'photocard',img:'close_bangs.jpg',   name:'PHOTOCARD NO.07',  cap:'官方小卡' },
    { type:'magazine', img:'mag_singles.jpg',   name:'MAGAZINE VOL.296', cap:'实体刊' },
    { type:'vinyl',    img:'mag_rose.jpg',     name:'VINYL SIDE A',     cap:'OST 黑胶' },
    { type:'cupsleeve',img:'life_heart.jpg',    name:'CUP SLEEVE 1019',  cap:'生日应援杯套' },
    { type:'acrylic',  img:'mag_cream.jpg',     name:'ACRYLIC NO.62',    cap:'亚克力立牌' }
  ];
  function renderGoods() {
    var wrap = document.getElementById('goods-wrap');
    if (!wrap) return;
    GOODS.forEach(function (g, i) {
      var card = document.createElement('div');
      card.className = 'goods-item reveal goods-' + g.type;
      card.style.transitionDelay = i * 0.07 + 's';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', '周边 · ' + g.cap + ' ' + g.name);
      card.innerHTML = '<div class="goods-photo"><img src="./assets/' + g.img + '" alt="' + g.name + '" loading="lazy" decoding="async"></div><div class="goods-info"><b>' + g.name + '</b><i>' + g.cap + '</i></div>';
      function ping() { toast('只展不卖 · 收藏柜不收钱，只收喜欢 ♡'); }
      card.addEventListener('click', ping);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ping(); }
      });
      wrap.appendChild(card);
    });
  }

  /* ---------- Hero drama-stills slideshow：代表作剧照轮播 ---------- */
  var HERO_SLIDES = [
    { img:'char_qot.jpg', t:'眼泪女王', yr:'QUEEN OF TEARS · 2024' },
    { img:'char_drx1.jpg', t:'Doctor X', yr:'2026 · NEW DRAMA' },
    { img:'char_liberty.jpg', t:'我的解放日志', yr:'MY LIBERATION NOTE · 2022' },
    { img:'char_dots.jpg', t:'太阳的后裔', yr:'DESCENDANTS OF THE SUN · 2016' },
    { img:'char_ffmw.jpg', t:'三流之路', yr:'FIGHT FOR MY WAY · 2017' },
    { img:'char_arthdal.jpg', t:'阿斯达编年史', yr:'ARTHDAL CHRONICLES · 2019' }
  ];
  function initHeroSlides() {
    var wrap = document.getElementById('hero-slides');
    var cap = document.getElementById('hero-slide-cap');
    if (!wrap) return;
    var slides = [];
    HERO_SLIDES.forEach(function (s, i) {
      var d = document.createElement('div');
      d.className = 'hero-slide' + (i === 0 ? ' active' : '');
      d.style.backgroundImage = 'url(./assets/' + s.img + ')';
      wrap.appendChild(d);
      slides.push(d);
    });
    function setCap(i) {
      if (cap) cap.innerHTML = '<b>' + HERO_SLIDES[i].t + '</b>DRAMATIC STILL <span style="color:var(--accent2)">♡</span> ' + HERO_SLIDES[i].yr;
    }
    setCap(0);
    if (prefersReduced) return;
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % slides.length;
      slides.forEach(function (el, i) { el.classList.toggle('active', i === idx); });
      setCap(idx);
    }, 5000);
  }

  /* ---------- Filter tabs ---------- */
  function renderFilters() {
    var wrap = document.getElementById('filters');
    if (!wrap) return;
    var keys = Object.keys(CATS);
    keys.forEach(function (key) {
      var count = key === 'all' ? ITEMS.length : ITEMS.filter(function (it) { return it.cat === key; }).length;
      var btn = document.createElement('button');
      btn.className = 'filter-btn' + (key === 'all' ? ' active' : '');
      btn.dataset.cat = key;
      btn.innerHTML = CATS[key].zh + '<span class="count">(' + count + ')</span>';
      btn.addEventListener('click', function () { filterCollection(key); });
      wrap.appendChild(btn);
    });
    /* 我的最爱：只看收藏的藏品 */
    var favBtn = document.createElement('button');
    favBtn.className = 'filter-btn favs-btn';
    favBtn.dataset.cat = 'favs';
    favBtn.innerHTML = '我的最爱 ♡<span class="count">(' + favs.length + ')</span>';
    favBtn.addEventListener('click', function () {
      if (!favs.length) { toast('还没有标记任何一件 ♡ 点击卡片左上角收藏'); return; }
      filterCollection('favs');
    });
    wrap.appendChild(favBtn);
    /* 随机一件：从当前筛选范围里抽一件进灯箱 */
    var diceBtn = document.createElement('button');
    diceBtn.className = 'filter-btn dice-btn';
    diceBtn.type = 'button';
    diceBtn.textContent = '随机一件';
    diceBtn.addEventListener('click', function () {
      var pool = getFilteredList();
      if (!pool.length) return;
      openLightbox(pool[Math.floor(Math.random() * pool.length)]);
    });
    wrap.appendChild(diceBtn);
  }

  /* 图片宽高档案：渲染时预留画幅，避免加载期布局跳动 */
  var DIMS = {"airport_black.jpg":[2000,1125],"airport_blue.jpg":[1080,1580],"airport_quilt.jpg":[1080,1319],"airport_wave.jpg":[1080,1512],"award_baeksang1.jpg":[578,828],"award_baeksang2.jpg":[640,506],"award_blazer.jpg":[1200,1975],"award_dior.jpg":[1440,1800],"award_dior2.jpg":[1440,1800],"award_event.jpg":[1920,1441],"award_mic.jpg":[1000,1500],"award_redcarpet.jpg":[1106,1356],"award_stage.jpg":[1920,1280],"award_stage2.jpg":[2000,1250],"award_white2.jpg":[1333,2000],"award_whitedress.jpg":[1000,1500],"camp_charm.jpg":[1039,1299],"camp_coffee.jpg":[901,1350],"camp_denim.jpg":[1200,1802],"camp_denim2.jpg":[1200,1600],"camp_drg.jpg":[1200,1601],"camp_editorial.jpg":[1333,2000],"camp_hoodie.jpg":[700,980],"camp_jewel.jpg":[474,592],"camp_loupe.jpg":[998,1107],"camp_paulhueman.jpg":[1000,1503],"camp_polo.jpg":[700,980],"camp_touch.jpg":[802,1119],"camp_twice.jpg":[1080,1440],"camp_whoo.jpg":[800,1000],"char_arthdal.jpg":[1536,960],"char_city.jpg":[1024,1280],"char_dots.jpg":[1660,1038],"char_dots2.jpg":[1125,2000],"char_drx1.jpg":[660,440],"char_drx2.jpg":[660,372],"char_drx3.jpg":[660,372],"char_ffmw.jpg":[600,399],"char_heirs.jpg":[1920,1080],"char_heirs2.jpg":[1080,1074],"char_liberty.jpg":[2000,1250],"char_liberty2.jpg":[1600,900],"char_liberty3.jpg":[1920,1080],"char_qot.jpg":[2000,1251],"char_qot2.jpg":[2000,1250],"char_qot3.jpg":[1920,1080],"close_backlit.jpg":[1678,1080],"close_bangs.jpg":[1000,1334],"close_black.jpg":[1695,953],"close_blue.jpg":[1250,2000],"close_blue2.jpg":[1000,1500],"close_cry.jpg":[2000,1477],"close_dark.jpg":[1000,1501],"close_green.jpg":[1920,958],"close_lean.jpg":[1834,1147],"close_side.jpg":[1261,800],"close_smile.jpg":[1920,1440],"close_sparkle.jpg":[1000,1501],"life_cardigan.jpg":[2000,1333],"life_drinks.jpg":[960,1281],"life_field.jpg":[1920,1080],"life_green.jpg":[1080,1080],"life_heart.jpg":[1080,1580],"life_lookup.jpg":[1000,1000],"life_redcoat.jpg":[1080,1349],"life_ruffle.jpg":[1000,1250],"life_stairs.jpg":[1920,1280],"life_striped.jpg":[1468,1846],"life_table.jpg":[1000,1500],"life_variety.jpg":[2000,1250],"life_wall.jpg":[1000,1502],"mag_black.jpg":[998,1107],"mag_closeup.jpg":[1115,1280],"mag_cream.jpg":[1333,2000],"mag_gray.jpg":[800,1200],"mag_hill.jpg":[800,1200],"mag_leather.jpg":[960,1280],"mag_open.jpg":[500,625],"mag_overall.jpg":[1080,1437],"mag_rose.jpg":[1728,1080],"mag_singles.jpg":[1200,1448],"mag_slip.jpg":[700,980],"mag_soft.jpg":[979,2000],"mag_tie.jpg":[640,752],"mag_white2.jpg":[1200,1423],"vid_01.jpg":[810,607],"vid_02.jpg":[2490,1400],"vid_03.jpg":[1687,1053],"vid_04.jpg":[1280,720],"vid_05.jpg":[1111,628],"vid_06.jpg":[1579,888],"airport_2024.jpg":[690,1035],"award_fanmeet24.jpg":[690,976],"award_press26.jpg":[600,401],"award_sbs25a.jpg":[690,862],"award_sbs25b.jpg":[690,1035],"camp_duvetica25.jpg":[700,980],"camp_look26.jpg":[690,863],"camp_puffer26.jpg":[500,750],"char_drx4.jpg":[660,440],"char_drx5.jpg":[660,372],"mag_bazaar.jpg":[640,843],"mag_cosmo24.jpg":[800,1000],"mag_marie24.jpg":[1000,625],"mag_marie7.jpg":[1000,1333],"mag_noblesse.jpg":[1000,749],"mag_salt.jpg":[640,960],"mag_vogue1.jpg":[690,862],"mag_vogue2.jpg":[690,862],"show_01.jpg":[500,375]};

  /* ---------- 收藏（我的最爱，本地保存）---------- */
  var favs = [];
  var favsMemOnly = false;
  try {
    favs = JSON.parse(window.localStorage.getItem('kjw-favs') || '[]');
    if (!Array.isArray(favs)) favs = [];
  } catch (e) { favs = []; favsMemOnly = true; }
  function saveFavs() {
    if (favsMemOnly) return;
    try { window.localStorage.setItem('kjw-favs', JSON.stringify(favs)); } catch (e) { favsMemOnly = true; }
  }
  function isFav(img) { return favs.indexOf(img) >= 0; }
  function toggleFav(img) {
    var i = favs.indexOf(img);
    if (i >= 0) { favs.splice(i, 1); toast('已移出我的最爱'); }
    else { favs.push(img); toast('已收进我的最爱 ♡'); }
    saveFavs();
    syncFavUI(img);
  }
  function syncFavUI(img) {
    var cards = document.querySelectorAll('.collect-card[data-img="' + img + '"]');
    [].forEach.call(cards, function (card) {
      card.classList.toggle('faved', isFav(img));
      var b = card.querySelector('.c-fav');
      if (b) b.textContent = isFav(img) ? '♥' : '♡';
    });
    if (currentCat === 'favs') applyFilter(false);
    var lbBtn = document.getElementById('lb-fav');
    if (lbBtn && lbBtn.dataset.img === img) {
      lbBtn.classList.toggle('faved', isFav(img));
      lbBtn.textContent = isFav(img) ? '♥' : '♡';
    }
    var cnt = document.querySelector('.favs-btn .count');
    if (cnt) cnt.textContent = '(' + favs.length + ')';
  }

  /* ---------- Toast 轻提示 ---------- */
  var toastTimer = null;
  function toast(msg) {
    var el = document.getElementById('kjw-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2400);
  }
  function initToast() {
    if (document.getElementById('kjw-toast')) return;
    var t = document.createElement('div');
    t.id = 'kjw-toast';
    t.setAttribute('role', 'status');
    document.body.appendChild(t);
  }

  /* ---------- Render grid ---------- */
  var currentCat = 'all';
  function renderGrid() {
    var grid = document.getElementById('collection-grid');
    if (!grid) return;
    grid.innerHTML = '';
    ITEMS.forEach(function (item, idx) {
      var card = document.createElement('article');
      card.className = 'collect-card reveal';
      card.style.transitionDelay = (idx % 8) * 0.05 + 's';
      card.dataset.cat = item.cat;
      card.dataset.img = item.img;
      if (isFav(item.img)) card.classList.add('faved');

      var imgWrap = document.createElement('div');
      imgWrap.className = 'c-img';
      var img = document.createElement('img');
      img.src = './assets/' + item.img;
      img.alt = '金智媛 · ' + CATS[item.cat].zh;
      img.loading = 'eager';
      img.decoding = 'async';
      /* 宽高占位：预先保留画幅，避免加载期间瀑布流跳动 */
      var dm = DIMS[item.img];
      if (dm) { img.setAttribute('width', dm[0]); img.setAttribute('height', dm[1]); img.style.aspectRatio = dm[0] + ' / ' + dm[1]; }
      imgWrap.appendChild(img);
      var heart = document.createElement('span');
      heart.className = 'c-heart';
      heart.setAttribute('aria-hidden', 'true');
      heart.textContent = '♡';
      imgWrap.appendChild(heart);
      /* 收藏角标：点击收进 / 移出「我的最爱」 */
      var favBtn = document.createElement('button');
      favBtn.className = 'c-fav';
      favBtn.type = 'button';
      favBtn.setAttribute('aria-label', isFav(item.img) ? '移出我的最爱' : '收进我的最爱');
      favBtn.textContent = isFav(item.img) ? '♥' : '♡';
      favBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleFav(item.img); });
      imgWrap.appendChild(favBtn);

      card.appendChild(imgWrap);

      /* 3D 倾斜：仅精确指针（鼠标）且未开启减少动效时启用 */
      if (!prefersReduced && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = 'perspective(900px) rotateX(' + (-y * 5).toFixed(2) + 'deg) rotateY(' + (x * 5).toFixed(2) + 'deg) translateY(-8px)';
        });
        card.addEventListener('mouseleave', function () { card.style.transform = ''; });
      }

      card.addEventListener('click', function () { openLightbox(item); });
      grid.appendChild(card);
    });
    applyFilter(false);
    observeReveals();
  }

  function filterCollection(cat, animate) {
    currentCat = cat;
    var btns = document.querySelectorAll('.filter-btn');
    btns.forEach(function (b) { b.classList.toggle('active', b.dataset.cat === cat); });
    applyFilter(animate !== false);
  }
  function itemMatches(cat, c) {
    if (cat === 'all') return true;
    if (cat === 'favs') return c.classList.contains('faved');
    return c.dataset.cat === cat;
  }
  /* FLIP 筛选：可见卡片平滑飞往新位置，视口内新亮相的卡片重播入场动画 */
  function applyFilter(animate) {
    var grid = document.getElementById('collection-grid');
    if (!grid) return;
    var cards = [].slice.call(grid.children);
    var i, c, first = {};
    if (animate && !prefersReduced) {
      for (i = 0; i < cards.length; i++) { c = cards[i]; if (c.style.display !== 'none') first[c.dataset.img] = c.getBoundingClientRect(); }
    }
    var fresh = [];
    for (i = 0; i < cards.length; i++) {
      c = cards[i];
      var show = itemMatches(currentCat, c);
      if (show && c.style.display === 'none') fresh.push(c);
      c.style.display = show ? '' : 'none';
    }
    var replay = [];
    fresh.forEach(function (c, n) {
      var r = c.getBoundingClientRect();
      if (r.top < window.innerHeight + 60 && r.bottom > -60) {
        c.classList.remove('visible');
        c.style.transitionDelay = Math.min(n, 10) * 0.045 + 's';
        replay.push(c);
      }
    });
    if (replay.length) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          replay.forEach(function (c) { c.classList.add('visible'); });
          /* 入场结束后清掉行内延迟，避免影响后续 hover 过渡 */
          setTimeout(function () { replay.forEach(function (c) { c.style.transitionDelay = ''; }); }, 1500);
        });
      });
    }
    if (animate && !prefersReduced) {
      cards.forEach(function (c) {
        if (c.style.display === 'none') return;
        var f = first[c.dataset.img];
        if (!f) return;
        var l = c.getBoundingClientRect();
        var dx = f.left - l.left, dy = f.top - l.top;
        c.style.transitionDelay = '0s';
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        c.style.transition = 'none';
        c.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        void c.offsetWidth;
        c.style.transition = '';
        c.style.transform = '';
      });
    }
  }

  /* ---------- 今日之选（按日期自动轮换一件藏品）---------- */
  function renderTodayPick() {
    var wrap = document.getElementById('today-wrap');
    if (!wrap) return;
    var d = new Date();
    /* 按本地日期轮换：每天零点换一件 */
    var day = Math.floor((Date.now() - d.getTimezoneOffset() * 60000) / 86400000);
    var item = ITEMS[day % ITEMS.length];
    var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
    var dateStr = d.getFullYear() + '.' + pad(d.getMonth() + 1) + '.' + pad(d.getDate());
    /* 自《继承者们》首播日 2013.10.09 起计的角色同行天数 */
    var days = Math.floor((Date.now() - new Date(2013, 9, 9).getTime()) / 86400000);
    var no = ITEMS.indexOf(item) + 1;
    var dm = DIMS[item.img];
    var fig = document.createElement('div');
    fig.className = 'today-card reveal';
    fig.innerHTML =
      '<div class="today-img">' +
        '<img src="./assets/' + item.img + '" alt="金智媛 · ' + CATS[item.cat].zh + '"' + (dm ? ' width="' + dm[0] + '" height="' + dm[1] + '" style="aspect-ratio:' + dm[0] + ' / ' + dm[1] + '"' : '') + '>' +
      '</div>' +
      '<div class="today-info">' +
        '<p class="today-eyebrow">TODAY&#8217;S PICK &#10022; 每日轮换</p>' +
        '<div class="today-date">' + dateStr + '</div>' +
        '<p class="today-no">NO.<b>' + String(no).padStart(2, '0') + '</b> / ' + ITEMS.length + ' &#183; ' + CATS[item.cat].zh + ' ' + CATS[item.cat].ko + '</p>' +
        '<div class="today-rule"></div>' +
        '<p class="today-days">自 2013.10.09《继承者们》首播至今<br>已与她的角色同行 <span class="cnt" data-target="' + days + '" data-decimals="0">0</span> 天</p>' +
      '</div>';
    fig.addEventListener('click', function () { openLightbox(item); });
    wrap.appendChild(fig);
  }

  /* ---------- Screening room ---------- */
  function renderScreening() {
    var grid = document.getElementById('screen-grid');
    if (!grid) return;
    VIDEOS.forEach(function (v, i) {
      var card = document.createElement('article');
      card.className = 'vid-card reveal';
      card.style.transitionDelay = (i % 6) * 0.06 + 's';
      var no = document.createElement('span');
      no.className = 'c-no';
      no.textContent = 'REEL ' + String(i + 1).padStart(2, '0');
      var cover = document.createElement('div');
      cover.className = 'v-cover';
      var img = document.createElement('img');
      img.src = './assets/' + v.cover;
      img.alt = v.title;
      img.loading = 'lazy';
      img.decoding = 'async';
      var play = document.createElement('div');
      play.className = 'v-play';
      play.innerHTML = '<span class="ring">&#9654;</span>';
      var dur = document.createElement('span');
      dur.className = 'v-dur';
      dur.textContent = v.dur;
      cover.appendChild(img); cover.appendChild(play); cover.appendChild(dur);
      var meta = document.createElement('div');
      meta.className = 'v-meta';
      meta.innerHTML = '<h3>' + v.title + '</h3><p class="v-sub">UP ' + v.up + ' · ' + v.view + '播放 · <a href="https://www.bilibili.com/video/' + v.bvid + '/" target="_blank" rel="noopener">bilibili ↗</a></p>';
      meta.querySelector('a').addEventListener('click', function (e) { e.stopPropagation(); });
      card.appendChild(no); card.appendChild(cover); card.appendChild(meta);
      card.addEventListener('click', function () {
        if (cover.querySelector('iframe')) return;
        var fr = document.createElement('iframe');
        fr.src = 'https://player.bilibili.com/player.html?bvid=' + v.bvid + '&autoplay=1&danmaku=0&high_quality=1';
        fr.allow = 'autoplay; fullscreen; encrypted-media';
        fr.setAttribute('allowfullscreen', '');
        fr.setAttribute('scrolling', 'no');
        fr.title = v.title;
        cover.innerHTML = '';
        cover.appendChild(fr);
      });
      grid.appendChild(card);
    });
  }

  /* ---------- Lightbox ---------- */
  var lbIndex = 0;
  var lbList = ITEMS;
  function getFilteredList() {
    if (currentCat === 'all') return ITEMS;
    if (currentCat === 'favs') return ITEMS.filter(function (it) { return isFav(it.img); });
    return ITEMS.filter(function (it) { return it.cat === currentCat; });
  }
  function openLightbox(item) {
    /* 打开时以当前筛选范围生成导航快照；目标不在范围内则回退全集 */
    lbList = getFilteredList();
    lbIndex = lbList.indexOf(item);
    if (lbIndex < 0) { lbList = ITEMS; lbIndex = lbList.indexOf(item); }
    if (lbIndex < 0) lbIndex = 0;
    showLightboxItem();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
    /* 首次打开时短暂显示快捷键提示 */
    var hint = document.getElementById('lb-hint');
    if (hint && !hint.getAttribute('data-shown')) {
      hint.setAttribute('data-shown', '1');
      hint.classList.add('show');
      setTimeout(function () { hint.classList.remove('show'); }, 3200);
    }
  }
  function showLightboxItem() {
    lbResetZoom();
    var item = lbList[lbIndex];
    var img = document.getElementById('lb-img');
    img.src = './assets/' + item.img;
    img.style.display = '';
    img.alt = '金智媛 · ' + CATS[item.cat].zh;
    var cnt = document.getElementById('lb-count');
    if (cnt) cnt.innerHTML = '<b>' + String(lbIndex + 1).padStart(2, '0') + '</b> / ' + String(lbList.length).padStart(2, '0') + ' <span style="color:var(--accent2)">♡</span>';
    img.style.animation = 'none';
    void img.offsetWidth;
    img.style.animation = '';
    /* 预加载下一张，切换更顺滑 */
    var nxt = lbList[(lbIndex + 1) % lbList.length];
    if (nxt) { var pre = new Image(); pre.src = './assets/' + nxt.img; }
    /* 同步收藏按钮状态 */
    var lbFav = document.getElementById('lb-fav');
    if (lbFav) {
      lbFav.dataset.img = item.img;
      lbFav.classList.toggle('faved', isFav(item.img));
      lbFav.textContent = isFav(item.img) ? '♥' : '♡';
    }
  }
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
    lbResetZoom();
  }
  function lbNav(dir) {
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    showLightboxItem();
  }

  /* 缩放状态：滚轮 / 双击在 1–3 倍间缩放，放大后可拖拽平移 */
  var lbZoom = 1, lbPanX = 0, lbPanY = 0;
  function lbApplyTf() {
    var im = document.getElementById('lb-img');
    if (!im) return;
    im.style.transform = lbZoom <= 1 ? '' : 'scale(' + lbZoom + ') translate(' + lbPanX + 'px,' + lbPanY + 'px)';
  }
  function lbClampPan() {
    if (lbZoom <= 1) { lbPanX = 0; lbPanY = 0; return; }
    var im = document.getElementById('lb-img');
    if (!im) return;
    var mx = im.offsetWidth * (lbZoom - 1) / 2;
    var my = im.offsetHeight * (lbZoom - 1) / 2;
    if (lbPanX > mx) lbPanX = mx; if (lbPanX < -mx) lbPanX = -mx;
    if (lbPanY > my) lbPanY = my; if (lbPanY < -my) lbPanY = -my;
  }
  function lbResetZoom() {
    lbZoom = 1; lbPanX = 0; lbPanY = 0;
    lbApplyTf();
    var lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('zoomed');
  }

  function initLightbox() {
    var lbEl = document.getElementById('lightbox');
    document.getElementById('lb-close').addEventListener('click', closeLightbox);
    document.getElementById('lb-prev').addEventListener('click', function () { lbNav(-1); });
    document.getElementById('lb-next').addEventListener('click', function () { lbNav(1); });
    lbEl.addEventListener('click', function (e) { if (e.target === lbEl) closeLightbox(); });
    /* 灯箱内收藏 */
    var lbFavBtn = document.getElementById('lb-fav');
    if (lbFavBtn) lbFavBtn.addEventListener('click', function () { var cur = lbList[lbIndex]; if (cur) toggleFav(cur.img); });
    document.addEventListener('keydown', function (e) {
      if (!document.getElementById('lightbox').classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbNav(-1);
      if (e.key === 'ArrowRight') lbNav(1);
      if (e.key === 'f' || e.key === 'F') { var cur = lbList[lbIndex]; if (cur) toggleFav(cur.img); }
    });
    /* 滚轮缩放 + 拖拽平移（仅精确指针） */
    var wrap = lbEl.querySelector('.lb-img-wrap');
    var im = document.getElementById('lb-img');
    if (wrap && im) {
      wrap.addEventListener('wheel', function (e) {
        e.preventDefault();
        var prev = lbZoom;
        lbZoom = Math.max(1, Math.min(3, lbZoom * (e.deltaY < 0 ? 1.18 : 1 / 1.18)));
        if (lbZoom === 1 && prev !== 1) { lbPanX = 0; lbPanY = 0; }
        lbClampPan();
        lbApplyTf();
        lbEl.classList.toggle('zoomed', lbZoom > 1);
      }, { passive: false });
      im.addEventListener('dblclick', function () {
        lbZoom = lbZoom > 1 ? 1 : 2;
        lbPanX = 0; lbPanY = 0;
        lbApplyTf();
        lbEl.classList.toggle('zoomed', lbZoom > 1);
      });
      var dragging = false, dsx = 0, dsy = 0;
      wrap.addEventListener('mousedown', function (e) {
        if (lbZoom <= 1) return;
        dragging = true;
        dsx = e.clientX - lbPanX; dsy = e.clientY - lbPanY;
        im.style.transition = 'none';
        e.preventDefault();
      });
      window.addEventListener('mousemove', function (e) {
        if (!dragging) return;
        lbPanX = e.clientX - dsx; lbPanY = e.clientY - dsy;
        lbClampPan();
        lbApplyTf();
      });
      window.addEventListener('mouseup', function () {
        if (!dragging) return;
        dragging = false;
        im.style.transition = '';
      });
    }
    /* 移动端：滑动切换；放大态下滑动改为平移 */
    var tsx = 0, tsy = 0, tmove = false;
    lbEl.addEventListener('touchstart', function (e) {
      tsx = e.touches[0].clientX; tsy = e.touches[0].clientY;
      tmove = lbZoom > 1;
      if (tmove) {
        tsx = tsx - lbPanX; tsy = tsy - lbPanY;
        if (im) im.style.transition = 'none';
      }
    }, { passive: true });
    lbEl.addEventListener('touchmove', function (e) {
      if (!tmove) return;
      lbPanX = e.touches[0].clientX - tsx;
      lbPanY = e.touches[0].clientY - tsy;
      lbClampPan();
      lbApplyTf();
    }, { passive: true });
    lbEl.addEventListener('touchend', function (e) {
      if (im) im.style.transition = '';
      if (tmove) { tmove = false; return; }
      var dx = e.changedTouches[0].clientX - tsx;
      var dy = e.changedTouches[0].clientY - tsy;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) lbNav(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---------- Nav ---------- */
  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.addEventListener('click', function (e) { if (e.target.tagName === 'A') links.classList.remove('open'); });
  }

  /* ---------- 年表 → 藏品联动：点击剧名跳到对应剧照并闪光 ---------- */
  var DRAMA_MAP = { '继承者们': 'char_heirs', '太阳的后裔': 'char_dots', '三流之路': 'char_ffmw', '阿斯达编年史': 'char_arthdal', '都市男女爱情法则': 'char_city', '我的解放日志': 'char_liberty', '眼泪女王': 'char_qot', 'Doctor X': 'char_drx' };
  function initTimelineLinks() {
    var nodes = document.querySelectorAll('.tl-node');
    [].forEach.call(nodes, function (node) {
      node.addEventListener('click', function () {
        var b = node.querySelector('b');
        if (!b) return;
        var name = b.textContent.trim();
        var prefix = null;
        Object.keys(DRAMA_MAP).forEach(function (k) { if (!prefix && (name === k || name.indexOf(k) >= 0)) prefix = DRAMA_MAP[k]; });
        if (!prefix) return;
        /* 若当前不在「全部」，先切回，保证目标卡片可见 */
        if (currentCat !== 'all') filterCollection('all', false);
        var target = document.querySelector('.collect-card[data-img^="' + prefix + '"]');
        if (!target) return;
        var top = window.scrollY + target.getBoundingClientRect().top - 64;
        window.scrollTo({ top: top, behavior: prefersReduced ? 'auto' : 'smooth' });
        flashCards(prefix);
      });
    });
  }
  function flashCards(prefix) {
    var cards = [].slice.call(document.querySelectorAll('.collect-card')).filter(function (c) { return c.dataset.img.indexOf(prefix) === 0; });
    cards.forEach(function (c, n) {
      setTimeout(function () { c.classList.add('flash'); }, 450 + n * 140);
      setTimeout(function () { c.classList.remove('flash'); }, 450 + n * 140 + 1600);
    });
  }

  /* ---------- Reveal ---------- */
  function observeReveals() {
    var els = [].slice.call(document.querySelectorAll('.reveal:not(.visible)'));
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('visible'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
    /* 兜底：极少数环境（自动化/嵌入式浏览器）IntersectionObserver 不触发，延迟补跑首屏元素 */
    setTimeout(function () {
      els.forEach(function (el) {
        if (el.classList.contains('visible')) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
      });
    }, 1600);
  }

  /* ---------- Count-up ---------- */
  function initCounters() {
    var els = [].slice.call(document.querySelectorAll('.cnt'));
    function run(el) {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      var target = parseFloat(el.getAttribute('data-target'));
      var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      if (prefersReduced) { el.textContent = target.toFixed(dec); return; }
      var t0 = null, dur = 1400;
      function step() {
        if (t0 === null) t0 = Date.now();
        var k = Math.min((Date.now() - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - k, 3);
        el.textContent = (target * ease).toFixed(dec);
        if (k < 1) setTimeout(step, 16);
      }
      step();
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
    /* 兜底：IntersectionObserver 失灵环境下（如自动化浏览器），对视口内数字直接补跑动画 */
    setTimeout(function () {
      els.forEach(function (el) {
        if (el.dataset.counted) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) run(el);
      });
    }, 1600);
  }

  /* ---------- Hero dust particles ---------- */
  function initDust() {
    var canvas = document.getElementById('dust');
    if (!canvas || prefersReduced) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var W, H, pts = [], raf;
    var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#d9b06c';
    var accent2 = getComputedStyle(document.documentElement).getPropertyValue('--accent2').trim() || '#e79cb0';
    function resize() { var h = canvas.parentElement; W = canvas.width = h.clientWidth; H = canvas.height = h.clientHeight; }
    function mk(init) {
      return { x: Math.random() * W, y: init ? Math.random() * H : -10, r: 1 + Math.random() * 2.6, vy: 0.25 + Math.random() * 0.7, a: 0.25 + Math.random() * 0.5, g: Math.random() < 0.5 ? accent : accent2, sw: 20 + Math.random() * 40, sp: Math.random() * Math.PI * 2 };
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var t = Date.now() / 1000;
      pts.forEach(function (p, i) {
        p.y += p.vy;
        var x = p.x + Math.sin(t + p.sp) * p.sw * 0.3;
        if (p.y > H + 10) pts[i] = mk(false);
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.g;
        ctx.beginPath();
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    resize();
    for (var i = 0; i < 60; i++) pts.push(mk(true));
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
    document.addEventListener('visibilitychange', function () { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(draw); });
  }

  /* ---------- Back to top ---------- */
  function initTop() {
    var btn = document.getElementById('backtop');
    if (!btn) return;
    window.addEventListener('scroll', function () { btn.classList.toggle('show', window.scrollY > 700); }, { passive: true });
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }); });
  }

  /* ---------- Premium layer: 进度条 / 视差 / 光晕 ---------- */
  function initProgress() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    var tick = false;
    function update() {
      tick = false;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ')';
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  function initParallax() {
    var hero = document.getElementById('hero');
    if (!hero || prefersReduced || !window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
    var slides = hero.querySelector('.hero-slides');
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      if (slides) slides.style.transform = 'translate(' + (-x * 14).toFixed(1) + 'px,' + (-y * 10).toFixed(1) + 'px)';
    });
    hero.addEventListener('mouseleave', function () {
      if (slides) slides.style.transform = '';
    });
  }

  function initCursorGlow() {
    var glow = document.getElementById('cursor-glow');
    if (!glow || prefersReduced || !window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
    document.addEventListener('mousemove', function (e) {
      if (glow.style.opacity !== '1') glow.style.opacity = '1';
      glow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
    });
    document.addEventListener('mouseleave', function () { glow.style.opacity = '0'; });
  }

  /* ---------- Quote rotation ---------- */
  var QUOTES = [
    { text: '「崇拜我吧。」<br>这样一来，说不定一切都会顺利起来。', cite: 'MY LIBERATION NOTE · 廉美贞 · 2022' },
    { text: '「我出生一百次，都想和你交往。」', cite: 'QUEEN OF TEARS · 洪海仁 · 2024' },
    { text: '「人要做自己喜欢的事情，才能活过来。」', cite: 'FIGHT FOR MY WAY · 崔爱拉 · 2017' },
    { text: '「见到了百年一遇的大雪，你回来了。<br>现在我一生的运气都用完了，就只剩下你了。」', cite: 'DESCENDANTS OF THE SUN · 尹明珠 · 2016' },
    { text: '「我希望我们都能过得幸福，<br>像炽热且阳光普照的日子一样，没有一点伤痕。」', cite: 'MY LIBERATION NOTE · 2022' },
    { text: '「我想突破！但不管是成功突破的我，<br>或是无法突破的我，我都想给予支持。」', cite: '金智媛 · Marie Claire 专访 · 2024' },
    { text: '「十六年，八个角色，一整面墙的瞬间 ——<br>收藏不需要理由。」', cite: 'COLLECTION CABINET · 策展人语' }
  ];
  function initQuotes() {
    var bq = document.getElementById('q-text');
    var ct = document.getElementById('q-cite');
    var dots = document.getElementById('q-dots');
    if (!bq || !ct) return;
    if (prefersReduced) return; /* 减少动效：保持第一条静态 */
    var idx = 0;
    setInterval(function () {
      if (document.hidden) return;
      idx = (idx + 1) % QUOTES.length;
      bq.classList.add('q-fade');
      ct.classList.add('q-fade');
      setTimeout(function () {
        bq.innerHTML = QUOTES[idx].text;
        ct.textContent = QUOTES[idx].cite;
        bq.classList.remove('q-fade');
        ct.classList.remove('q-fade');
        if (dots) [].forEach.call(dots.children, function (d, n) { d.classList.toggle('on', n === idx); });
      }, 620);
    }, 8000);
  }

  /* ---------- 开场序幕（每个浏览器会话只播一次）---------- */
  function initPreloader() {
    if (prefersReduced) return;
    var seen = false;
    try { seen = window.sessionStorage.getItem('kjw-intro') === '1'; } catch (e) { seen = true; }
    if (seen) return;
    try { window.sessionStorage.setItem('kjw-intro', '1'); } catch (e) {}
    var ov = document.createElement('div');
    ov.className = 'kjw-intro';
    ov.innerHTML = '<div class="ki-box">' +
      '<span class="ki-moon"></span>' +
      '<div class="ki-title">金智媛 · 收藏柜</div>' +
      '<div class="ki-sub">KIM JI-WON COLLECTION CABINET</div>' +
      '<div class="ki-beam"></div>' +
    '</div>';
    document.body.appendChild(ov);
    document.body.classList.add('intro-lock');
    setTimeout(function () {
      ov.classList.add('bye');
      document.body.classList.remove('intro-lock');
      setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 650);
    }, 1250);
  }

  /* ---------- Init ---------- */
  function init() {
    initToast();
    initPreloader();
    initHeroSlides();
    renderFilters();
    renderGrid();
    renderTodayPick();
    renderScreening();
    renderGoods();
    initLightbox();
    initTimelineLinks();
    initNav();
    initCounters();
    initDust();
    initTop();
    initProgress();
    initParallax();
    initCursorGlow();
    initQuotes();
    observeReveals();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
