export function multiply_matrices(matrix1, matrix2) {
  // computes A * B
  const A_rows_num = matrix1.length;
  const A_cols_num = matrix1[0].length;
  const B_rows_num = matrix2.length;
  const B_cols_num = matrix2[0].length;
  if (A_cols_num != B_rows_num) return;
  let result = [];
  for (let i = 0; i < A_rows_num; i++) {
    let row = [];
    for (let j = 0; j < B_cols_num; j++) {
      let c = 0;
      for (let k = 0; k < A_cols_num; k++) c += matrix1[i][k] * matrix2[k][j];
      row.push(c);
    }
    result.push(row);
  }
  return result;
}

export function multiply_matrix_vector(matrix, vec) {
  // result = matrix * vec
  const matrix_rows_num = matrix.length;
  const matrix_cols_num = matrix[0].length;
  if (matrix_cols_num != vec.length) return;
  let result = [];
  for (let i = 0; i < matrix_rows_num; i++) {
    let c = 0;
    for (let j = 0; j < matrix_cols_num; j++) {
      c += matrix[i][j] * vec[j];
    }
    result.push(c);
  }
  return result;
}
