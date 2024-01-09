// export const FirstMatriks(grouped)

export const NormalisasiMatriks = (alternatif, values) => {
  let result = []; // Ganti ke array kosong agar bisa menambahkan objek
  const grouped = values.reduce((acc, curr) => {
    const { tbAlternatifId, ...rest } = curr;
    if (!acc[tbAlternatifId]) {
      acc[tbAlternatifId] = [];
    }
    acc[tbAlternatifId].push(rest);
    return acc;
  }, {});
  const groupedCriteria = values.reduce((acc, curr) => {
    const { tbCriteriumId, ...rest } = curr;
    if (!acc[tbCriteriumId]) {
      acc[tbCriteriumId] = [];
    }
    acc[tbCriteriumId].push(rest);
    return acc;
  }, {});

  alternatif.forEach((data) => {
    const calculatedValues = grouped[data.id].map((data2) => {
      const cal = (
        data2.nilai /
        Math.sqrt(
          groupedCriteria[data2.tbCriteriumId].reduce(
            (accumulator, currentValue) => {
              const nilai = parseInt(currentValue.nilai);
              const pangkatNilai = Math.pow(nilai, 2);
              return accumulator + pangkatNilai;
            },
            0
          )
        )
      ).toFixed(3);

      return {
        tbAlternatifId: data.id,
        tbCriteriumId: data2.tbCriteriumId,
        nilai: parseFloat(cal), // Ubah ke float untuk mengembalikan nilai decimal
      };
    });

    result = [...result, ...calculatedValues]; // Tambahkan hasil ke dalam result
  });

  return result;
};

export const PembobotanMatriks = (normalisasiMatriks, criteria) => {
  const result = normalisasiMatriks.map((item) => {
    const kriteria = criteria.find((k) => k.id === item.tbCriteriumId);
    const bobot = parseInt(kriteria.bobot);
    const nilaiDikalikanBobot = (item.nilai * bobot).toFixed(3);
    return {
      tbAlternatifId: item.tbAlternatifId,
      tbCriteriumId: item.tbCriteriumId,
      nilai: nilaiDikalikanBobot,
      code: kriteria.code,
    };
  });

  return result;
};

export const ConcordenSet = (alternatif, pembobotanMatriks, kriteria) => {
  const concordance = {};

  alternatif.forEach((altA) => {
    concordance[altA.id] = {};

    alternatif.forEach((altB) => {
      if (altA.id !== altB.id) {
        concordance[altA.id][altB.id] = [];

        pembobotanMatriks.forEach((item) => {
          if (
            item.tbAlternatifId === altA.id &&
            altA.id !== altB.id &&
            item.nilai >=
              pembobotanMatriks.find(
                (v) =>
                  v.tbAlternatifId === altB.id &&
                  v.tbCriteriumId === item.tbCriteriumId
              ).nilai
          ) {
            const kriteriaItem = kriteria.find(
              (k) => k.id === item.tbCriteriumId
            );
            if (kriteriaItem) {
              concordance[altA.id][altB.id].push(kriteriaItem.code);
            }
          }
        });
      }
    });
  });

  return concordance;
};

export const DiscordanceSet = (alternatif, pembobotanMatriks, kriteria) => {
  const discordance = {};

  alternatif.forEach((altA) => {
    discordance[altA.id] = {};

    alternatif.forEach((altB) => {
      if (altA.id !== altB.id) {
        discordance[altA.id][altB.id] = [];

        pembobotanMatriks.forEach((item) => {
          if (
            item.tbAlternatifId === altA.id &&
            altA.id !== altB.id &&
            item.nilai <
              pembobotanMatriks.find(
                (v) =>
                  v.tbAlternatifId === altB.id &&
                  v.tbCriteriumId === item.tbCriteriumId
              ).nilai
          ) {
            const kriteriaItem = kriteria.find(
              (k) => k.id === item.tbCriteriumId
            );
            if (kriteriaItem) {
              discordance[altA.id][altB.id].push(kriteriaItem.code);
            }
          }
        });
      }
    });
  });

  return discordance;
};

export const MatriksConcordance = (himpunanConcordance, kriteria) => {
  const totalBobot = {};

  for (const alternatif in himpunanConcordance) {
    totalBobot[alternatif] = {};
    for (const innerAlternatif in himpunanConcordance[alternatif]) {
      const total = himpunanConcordance[alternatif][innerAlternatif].reduce(
        (acc, kriteriaCode) => {
          const kriteriaItem = kriteria.find(
            (item) => item.code === kriteriaCode
          );
          return acc + parseInt(kriteriaItem.bobot);
        },
        0
      );
      totalBobot[alternatif][innerAlternatif] = total;
    }
  }
  return totalBobot;
};

export const MatriksDiscordance = (himpunanDiscordance, pembobotanMatriks) => {
  const A = {};
  const B = {};

  Object.keys(himpunanDiscordance).forEach((key, index) => {
    A[key] = [];
    B[key] = {};

    pembobotanMatriks
      .filter((res) => res.tbAlternatifId == key)
      .forEach((data2) => {
        A[key].push(data2.nilai);
      });
    Object.keys(himpunanDiscordance[key]).forEach((innerKey) => {
      B[key][innerKey] = [];

      himpunanDiscordance[key][innerKey].forEach((data) => {
        pembobotanMatriks
          .filter((res) => res.code === data)
          .forEach((data3) => {
            if (
              data3.tbAlternatifId == key ||
              data3.tbAlternatifId == innerKey
            ) {
              B[key][innerKey].push(data3.nilai);
            }
          });
      });
    });
  });

  const result = {};

  for (const key in B) {
    result[key] = {};
    for (const innerKey in B[key]) {
      const currentArray = B[key][innerKey];
      if (Array.isArray(currentArray)) {
        let maxDifference = null;
        for (let i = 0; i < currentArray.length - 1; i += 2) {
          const diff = Math.abs(currentArray[i] - currentArray[i + 1]);
          if (maxDifference === null || diff > maxDifference) {
            maxDifference = diff;
          }
        }
        result[key][innerKey] = maxDifference;
      } else {
        result[key][innerKey] = null; // Atau nilai lain jika bukan array
      }
    }
  }
  const result2 = {};

  for (const key in A) {
    result2[key] = {};
    for (const innerKey in A) {
      if (key !== innerKey) {
        const differences = [];
        for (let i = 0; i < A[key].length && i < A[innerKey].length; i++) {
          differences.push(Math.abs(A[key][i] - A[innerKey][i]));
        }
        result2[key][innerKey] = Math.max(...differences);
      }
    }
  }
  const discordance = {};

  for (const key in result) {
    discordance[key] = {};
    for (const innerKey in result[key]) {
      if (
        result2[key] &&
        result2[key][innerKey] !== null &&
        result[key][innerKey] !== null
      ) {
        discordance[key][innerKey] = (
          result[key][innerKey] / result2[key][innerKey]
        ).toFixed(3);
      } else {
        discordance[key][innerKey] = null;
      }
    }
  }

  return discordance;
};

export const Treshold = (matriks) => {
  let totalSum = 0;
  let totalKeys = Object.keys(matriks).length;

  for (const key in matriks) {
    for (const innerKey in matriks[key]) {
      if (matriks[key][innerKey] !== null) {
        totalSum += parseFloat(matriks[key][innerKey]);
      }
    }
  }

  const finalResult = totalSum / (totalKeys * (totalKeys - 1));
  return finalResult;
};

export const MDConcordance = (tresholdConcordance, matriksConcordance) => {
  const result = {};

  for (const key in matriksConcordance) {
    result[key] = { ...matriksConcordance[key] };
    for (const innerKey in result[key]) {
      if (result[key][innerKey] >= tresholdConcordance) {
        result[key][innerKey] = 1;
      } else {
        result[key][innerKey] = 0;
      }
    }
  }

  return result;
};

export const MDDiscordance = (tresholdDiscordance, matriksDiscordance) => {
  const result = {};

  for (const key in matriksDiscordance) {
    result[key] = { ...matriksDiscordance[key] };
    for (const innerKey in result[key]) {
      if (result[key][innerKey] < tresholdDiscordance) {
        result[key][innerKey] = 1;
      } else {
        result[key][innerKey] = 0;
      }
    }
  }

  return result;
};

export const AgregatDominan = (dominanConcordance, dominanDiscordance) => {
  const result = {};

  for (const keyA in dominanConcordance) {
    result[keyA] = {};
    for (const keyB in dominanConcordance[keyA]) {
      result[keyA][keyB] =
        dominanConcordance[keyA][keyB] * dominanDiscordance[keyA][keyB];
    }
  }
  return result;
};
