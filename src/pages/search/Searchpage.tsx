import styles from "./SearchPage.module.css";
import React, { useEffect } from "react";
import { Header, Footer, FilterArea, ProductList } from "../../components";
import { useParams, useLocation } from 'react-router-dom'
import { Spin } from 'antd';
import { useDispatch } from 'react-redux'
import { useSelector } from '../../redux/hooks'
import { searchProduct } from '../../redux/productSearch/slice'
import { MainLayout } from '../../layouts/mainLayout'
interface MatchParams {
  keywords: string;
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<MatchParams>();

  const loading = useSelector(s => s.productSearch.loading)
  const error = useSelector(s => s.productSearch.error)
  const pagination = useSelector(s => s.productSearch.pagination)
  const productList = useSelector(s => s.productSearch.data)

  const dispatch = useDispatch()
  const location = useLocation()

  /**once url changed, reboot useEffect and rerender the changed part in jsx  */
  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }))
  }, [location])

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }))
  }
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
        }} />)
  }
  if (error) {
    return <div>网站出错：{error}</div>;
  }
  return (
    <MainLayout>
      {/* 分类过滤器 */}
      <div className={styles["product-list-container"]}>
        <FilterArea />
      </div>
      {/* 产品列表  */}
      <div className={styles["product-list-container"]}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  );
};
