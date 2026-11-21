"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Clock,
  ArrowRight,
  RotateCcw,
  Share2,
  Award,
  TrendingUp,
  Building2,
  FileText,
} from "lucide-react";

// 質問データ（8問）
const QUESTIONS = [
  {
    id: 1,
    category: "現状の立ち位置",
    question: "現在の自分の『就活偏差値(ES)』を客観的な数値で把握していますか？",
    options: [
      { text: "毎月測定して、60以上をキープしている", score: 15 },
      { text: "一度測ったことはあるが、最近更新していない", score: 8 },
      { text: "測ったことがなく、感覚で進めている", score: 2 },
    ],
  },
  {
    id: 2,
    category: "ES・ガクチカの鮮度",
    question: "最近、自分のガクチカやESを第三者（エンカレメンターなど）に添削・分析してもらいましたか？",
    options: [
      { text: "直近2週間以内にフィードバックをもらい改善した", score: 15 },
      { text: "1ヶ月以上前に作ったものをそのまま使い回している", score: 6 },
      { text: "まだ完成していない・自己流のまま", score: 2 },
    ],
  },
  {
    id: 3,
    category: "選考通過の捉え方",
    question: "「今のESでインターンにいくつか通っているから大丈夫」と思っていますか？",
    options: [
      { text: "いいえ。周囲もレベルアップしているので常に改善が必要だと思う", score: 15 },
      { text: "少し安心しているが、本選考に向けて不安はある", score: 7 },
      { text: "はい。通っているので今のままでも戦えると思っている", score: 2 },
    ],
  },
  {
    id: 4,
    category: "情報戦・クローズド枠",
    question: "ナビサイトには載っていない『特別選考枠（選考スキップ等）』の案内をいくつ持っていますか？",
    options: [
      { text: "複数社から招待を受けており、有利に進めている", score: 15 },
      { text: "1〜2社はあるが、もっと選択肢を広げたい", score: 9 },
      { text: "まだ一つも持っていない・一般ルートのみ", score: 2 },
    ],
  },
  {
    id: 5,
    category: "面接対策の準備度",
    question: "自分のESから「面接官に深掘りされる予想質問」と「想定回答」を言語化できていますか？",
    options: [
      { text: "完璧に整理できており、どの角度から聞かれても答えられる", score: 10 },
      { text: "なんとなく頭にはあるが、書き出してはいない", score: 6 },
      { text: "正直、どこを深掘りされるか分かっていない", score: 2 },
    ],
  },
  {
    id: 6,
    category: "業界・企業視野",
    question: "大手企業から急成長ベンチャーまで、自分の「業界別の合格力」を知っていますか？",
    options: [
      { text: "自分の強みがどの業界で評価されるかデータで把握している", score: 10 },
      { text: "志望業界はあるが、他業界での市場価値は分からない", score: 6 },
      { text: "まだ業界を絞りきれておらず、手探り状態", score: 2 },
    ],
  },
  {
    id: 7,
    category: "行動スピード",
    question: "「最短5分で提出でき、2日後にプロの徹底分析レポートが無料で届く」としたらどうしますか？",
    options: [
      { text: "迷わず今日中に提出して、武器を手に入れる", score: 10 },
      { text: "時間が空いたらやろうと思う", score: 5 },
      { text: "面倒くさそうなので後回しにしがち", score: 1 },
    ],
  },
  {
    id: 8,
    category: "継続力",
    question: "就活は「毎月自分の現在地を測り、最新の企業オファーを受け取り続けること」が重要だと思いますか？",
    options: [
      { text: "強く思う。毎月アップデートし続けたい", score: 10 },
      { text: "大切だとは思うが、実践できていない", score: 6 },
      { text: "あまり意識したことがなかった", score: 2 },
    ],
  },
];

// 診断結果の判定ロジック
const getResultType = (score: number) => {
  if (score >= 85) {
    return {
      rank: "S",
      title: "無双目前！トップ層ランナータイプ",
      badgeColor: "bg-amber-500 text-white",
      borderColor: "border-amber-400",
      summary:
        "就活への意識と行動力が非常に高い状態です！ただし、上位層ほど「周囲の進化スピード」も速いのが就活の怖いところ。偏差値60超えを盤石にし、特別スキップ枠を総取りするために、今月の『プレミアルート』で最新の立ち位置を確定させましょう。",
      mentorAdvice:
        "今のESで通っていても、来月には基準が上がります。毎月出し続けて偏差値60以上をキープしつつ、損保ジャパン・オリックス・住友商事GMなどのクローズド枠を確実に掴みに行こう！",
    };
  } else if (score >= 60) {
    return {
      rank: "A",
      title: "あと一歩で化ける！伸びしろMAXタイプ",
      badgeColor: "bg-blue-600 text-white",
      borderColor: "border-blue-400",
      summary:
        "基礎はできていますが、「今のやり方で大丈夫だろう」という小さな油断が命取りになるフェーズです。知らない間に周りのESレベルが上がり、就活偏差値が急落するケースが一番多いのがこの層です。",
      mentorAdvice:
        "ガクチカがあるなら最短5分で提出可能！2日後に返ってくる『個別レポート（予想質問＆改善点）』を使うだけで、本選考の突破率が劇的に跳ね上がります。まずは明日11/20(金)の締切までに1回出してみよう！",
    };
  } else if (score >= 35) {
    return {
      rank: "B",
      title: "要注意！現状維持バイアス危険タイプ",
      badgeColor: "bg-orange-500 text-white",
      borderColor: "border-orange-400",
      summary:
        "「今のところ通ってるから大丈夫」「まだ時間がある」と思っていませんか？それは不確定情報でしかありません。他の就活生が毎日ESをブラッシュアップする中、立ち止まっていると一気に置いていかれます。",
      mentorAdvice:
        "自分の『就活偏差値』を直視することが逆転の第一歩！まずは偏差値60超えを目指して、今のガクチカをそのままプレミアルートに投げてみよう。プロの分析レポートが無料で手に入るチャンスを逃さないで！",
    };
  } else {
    return {
      rank: "C",
      title: "緊急アラート！今すぐ武器を揃えるべきタイプ",
      badgeColor: "bg-rose-600 text-white",
      borderColor: "border-rose-400",
      summary:
        "今はまだ感覚で就活を進めており、本来のポテンシャルを全く活かせていない状態です！一般ルートだけで戦うのは圧倒的に不利。まずは自分の現在地（就活偏差値）を知り、プロの添削と特別枠の案内を手に入れる必要があります。",
      mentorAdvice:
        "完璧なESじゃなくて大丈夫！ガクチカさえあれば数分で出せるし、初回提出特典の『自己分析ワークシート』や2日後の『個別レポート』があなたの最強の武器になります。明日11/20(金)の2次締切前に絶対に出そう！",
    };
  }
};

const COMPANIES = [
  "損保ジャパン",
  "オリックス",
  "住友商事グローバルメタルズ",
  "大和ハウス工業",
  "レバレジーズ",
  "エムスリー",
  "Works Human Intelligence",
  "日本タタ・コンサルタンシー・サービシズ",
  "レイヤーズ・コンサルティング",
  "エス・エム・エス",
  "オープンハウス・アーキテクト",
  "クスリのアオキ",
  "トライグループ",
  "セカンドリテイリング",
  "Scoville",
  "DYM",
  "フルサポ",
  "Grant",
  "データ×",
  "アーキテックス",
];

export default function PremierRouteDiagnosis() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const handleStart = () => {
    setStep("quiz");
    setCurrentIdx(0);
    setAnswers([]);
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep("result");
    }
  };

  const totalScore = answers.reduce((acc, cur) => acc + cur, 0);
  const result = getResultType(totalScore);

  const handleCopyResult = () => {
    const text = `【就活戦闘力＆プレミアルート必要度診断】\n結果：${result.rank}判定「${result.title}」（スコア：${totalScore}/100点）\n明日11/20(金)2次締切のプレミアルートにエントリーして、就活偏差値と個別レポートを手に入れます！`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* ヘッダー */}
      <header className="bg-slate-900 text-white py-3 px-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-2 py-0.5 rounded">
              en-courage
            </span>
            <span className="font-bold text-sm sm:text-base tracking-tight">
              プレミアルート必要度診断
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs bg-rose-600/90 text-white px-2.5 py-1 rounded-full font-bold animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>最終締切：11/30(月) 迫る！</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* イントロ画面 */}
        {step === "intro" && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 text-center relative">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>所要時間わずか1分・全8問</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-4">
                今のまま本選考に突入して大丈夫？
                <br />
                <span className="text-amber-400">あなたの就活危険度＆優遇獲得力</span>診断
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                「今のところES通ってるから大丈夫」が一番危険！？
                周囲がESをアップデートする中、あなたの現在地（就活偏差値）と、今すぐ『プレミアルート』を使うべき理由を診断します。
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-indigo-600 font-extrabold text-lg mb-1">
                    偏差値60超え
                  </div>
                  <p className="text-xs text-slate-600">
                    客観的な数値で自分の立ち位置を毎月把握できているか？
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-indigo-600 font-extrabold text-lg mb-1">
                    最短5分で完了
                  </div>
                  <p className="text-xs text-slate-600">
                    ガクチカさえあれば即提出！2日後に個別分析レポート返却
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-indigo-600 font-extrabold text-lg mb-1">
                    特別スキップ枠
                  </div>
                  <p className="text-xs text-slate-600">
                    損保ジャパン・オリックス・住友商事GM等の限定招待
                  </p>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-lg py-4 px-6 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>無料で診断をスタートする（全8問）</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* 質問画面 */}
        {step === "quiz" && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
            {/* プログレスバー */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                <span>
                  QUESTION {currentIdx + 1} / {QUESTIONS.length}
                </span>
                <span>{Math.round(((currentIdx + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{
                    width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mb-6">
              <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
                {QUESTIONS[currentIdx].category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {QUESTIONS[currentIdx].question}
              </h2>
            </div>

            <div className="space-y-3">
              {QUESTIONS[currentIdx].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full text-left p-4 sm:p-5 rounded-xl border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all font-medium text-slate-800 flex items-center justify-between group cursor-pointer"
                >
                  <span className="pr-4">{opt.text}</span>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 結果画面 */}
        {step === "result" && (
          <div className="space-y-6">
            {/* 診断結果メインカード */}
            <div
              className={`bg-white rounded-2xl shadow-xl border-2 ${result.borderColor} overflow-hidden`}
            >
              <div className="bg-slate-900 text-white p-6 text-center">
                <p className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-2">
                  YOUR DIAGNOSIS RESULT
                </p>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span
                    className={`text-2xl font-black px-4 py-1 rounded-lg ${result.badgeColor}`}
                  >
                    {result.rank}判定
                  </span>
                  <span className="text-slate-300 text-sm font-bold">
                    （就活戦闘力：{totalScore} / 100点）
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                  {result.title}
                </h2>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  {result.summary}
                </p>

                {/* メンターからの緊急メッセージ */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-xl">
                  <div className="flex items-center gap-2 font-extrabold text-amber-900 mb-1.5">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>担当メンターからの重要アドバイス</span>
                  </div>
                  <p className="text-sm text-amber-950 leading-relaxed font-medium">
                    {result.mentorAdvice}
                  </p>
                </div>

                {/* メンターが推す4つの理由 */}
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    <span>今すぐ『プレミアルート』を出すべき4つの理由</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="font-bold text-indigo-700 text-sm mb-1">
                        ① まずは「偏差値60超え」を目指そう！
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        感覚ではなく客観的な数値で自分の立ち位置を知ることが、難関企業突破の絶対条件です。
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="font-bold text-indigo-700 text-sm mb-1">
                        ② 「今通ってるから大丈夫」は危険！
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        周りも日々ESを改善しています。放置すると知らない間に偏差値が大幅に下がっているケースが多発！
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="font-bold text-indigo-700 text-sm mb-1">
                        ③ ガクチカがあれば最短5分で提出完了
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        新しく書き直す必要なし！手元のガクチカですぐに出せて、2日後には徹底分析レポートが届きます。
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="font-bold text-indigo-700 text-sm mb-1">
                        ④ 「毎月出し続けること」が最強の戦略
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        毎月の偏差値チェックになるだけでなく、月ごとに変わる注目企業の特別ルートへエントリーできます。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 豪華特典＆参加企業セクション */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 text-xs font-extrabold px-3 py-1 rounded-full mb-2">
                  <Award className="w-4 h-4" />
                  <span>先着1,500名限定・完全無料</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  提出から2日後を目処に届く『個別レポート』＆豪華特典
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
                {[
                  "あなたの最新『就活偏差値』",
                  "ガクチカの具体的な改善点・アドバイス",
                  "業界別の合格力判定とおすすめ企業",
                  "志望業界で求められる強みに対する評価",
                  "面接で人事から聞かれる予想質問リスト",
                  "ESの深掘り予想質問と想定回答",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-indigo-50/70 text-indigo-950 font-semibold p-3 rounded-lg"
                  >
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                <FileText className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-amber-900 text-sm">
                    【初回提出特典】「埋めたら完結！自己分析ワークシート」プレゼント
                  </div>
                  <p className="text-xs text-amber-800 mt-1">
                    手に入れた優遇ルートを最大限に活かし、内定へ直結させる限定ワークシートも無料配布！
                  </p>
                </div>
              </div>

              {/* 過去のご案内実績 */}
              <div className="border-t border-slate-200 pt-5">
                <h4 className="font-bold text-slate-900 text-sm mb-2">
                  ▼ 過去にご案内された『クローズド特別ルート』の一例
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside bg-slate-50 p-4 rounded-xl">
                  <li>某大手メガバンクによる『秋インターン攻略に向けた特別セミナー』ご招待</li>
                  <li>大手IT企業の社長登壇イベントへの特別ご招待</li>
                  <li>採用責任者との個別面談（個別FBつき）</li>
                  <li>1〜3次選考免除の『特別スキップ枠』／『特別選考枠』面談</li>
                </ul>
              </div>

              {/* 今回の参加企業 */}
              <div className="border-t border-slate-200 pt-5">
                <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>今回の参画企業（一部抜粋・全20社）</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {COMPANIES.map((company, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md border border-slate-200"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>

              {/* アクションボタン */}
              <div className="pt-4 space-y-3">
                <a
                  href="https://pathy.link/saHfJmYL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white font-extrabold text-base sm:text-lg py-4 px-6 rounded-xl shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>今すぐプレミアルートにエントリーする（最短5分）</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <p className="text-center text-xs text-rose-600 font-bold">
                  ※2次締切：11/20(金)まで！先着1,500名限定のためお早めに！
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleCopyResult}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>
                      {copied
                        ? "コピーしました！LINEでメンターに送ろう"
                        : "診断結果をコピーしてメンターに報告する"}
                    </span>
                  </button>
                  <button
                    onClick={handleStart}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>もう一度診断する</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
