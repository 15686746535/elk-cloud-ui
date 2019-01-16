<template>
  <div>
    <table border="0" stripe="true" cellpadding="0" cellspacing="0">
      <thead>
      <td width="120" align="center">1</td>
      <td width="120" align="center">2</td>
      <td width="120" align="center">3</td>
      <td width="120" align="center">4</td>
      </thead>
      <tbody>
      <tr >
        <td align="center">萨达萨达大阿萨</td>
        <td  align="center">萨达是大所</td>
        <td align="center">大萨达撒多</td>
        <td align="center">萨达是大所</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<style ref="stylesheet/scss" lang="scss">

  .data-table {
    margin: 10px 0;
  }
  .data-table table {
    width: 100%;
    border-collapse: collapse; //设置表格边框合并为单一边框
  }
  .data-table caption {
    height: 30px;
    line-height: 30px;
    font-weight: 700;
  }
  .data-table thead th,
  .data-table tbody td {
    padding:8px;
    height: 19px;
    line-height: 19px;
    font-weight: 400;
  }
  .data-table thead th {
    text-align: left;
    color:#fff;
    background-color: #353535;
  }
  .data-table tbody tr {
    background-color: #fefefe;
    color: #686868;
  }
  .data-table tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  /* 复选框的列宽 */
  .row-selected {
    width: 15px;
  }
</style>
