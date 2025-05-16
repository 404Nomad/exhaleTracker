export interface Improvement {
  key: string;
  title: string;
  desc: string;
  thresholdDays: number;
}

export const improvements: Improvement[] = [
  { key: 'heartRate', title: 'Pressure & rythme cardiaque', desc: 'Votre rythme cardiaque et votre tension baissent', thresholdDays: 0.01 },
  { key: 'carbon', title: 'Monoxyde de carbone normal', desc: 'Le monoxyde de carbone sanguin redescend à la normale', thresholdDays: 0.5 },
  { key: 'circulation', title: 'Circulation améliorée', desc: 'Votre circulation s’améliore et la fonction pulmonaire augmente', thresholdDays: 14 },
  { key: 'coughing', title: 'Toux réduite', desc: 'Toux et essoufflement diminuent', thresholdDays: 30 },
  { key: 'riskCoronary', title: 'Risque coronarien ×½', desc: 'Votre risque de coronaropathie est moitié moindre', thresholdDays: 365 },
  { key: 'strokeRisk', title: 'Risque d’AVC égal non-fumeur', desc: 'Le risque d’AVC devient celui d’un non-fumeur', thresholdDays: 1825 },
  { key: 'lungCancer', title: 'Risque cancer ×½', desc: 'Risque de cancer du poumon diminué de moitié', thresholdDays: 3650 },
  { key: 'coronaryHeartDisease', title: 'Cœur non-fumeur', desc: 'Risque coronarien équivalent à un non-fumeur', thresholdDays: 3650 }
];
