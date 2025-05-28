import { Button, Card, List, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
//加入购物车helper component
const AddToCartButton = ({ itemId }) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    setLoading(true);
    addItemToCart(itemId)
      .then(() => {
        message.success(`Successfully add item`);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Tooltip title="Add to shopping cart">
      <Button
        loading={loading}
        type="primary"
        icon={<PlusOutlined />}
        onClick={AddToCart}
      />
    </Tooltip>
  );
};

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [curRest, setCurRest] = useState(); //最好写全
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false); //menu
  const [loadingRest, setLoadingRest] = useState(false); //all restaurant
  //展示可以选择的餐厅dropdown
  useEffect(() => {
    setLoadingRest(true);
    getRestaurants()
      .then((data) => {
        setRestaurants(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoadingRest(false);
      });
  }, []); //空的中括号的意思是只运行一次
  //load menus automatically based on the restaurant selection
  useEffect(() => {
    if (curRest) {
      setLoading(true);
      getMenus(curRest)
        .then((data) => {
          setFoodData(data); //data是个array of object，所以[curRest]用中括号圈起来
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [curRest]);
  //ant design的dropdown
  //每一个map里item是一个餐厅option
  return (
    <>
      <Select
        value={curRest}
        onSelect={(value) => setCurRest(value)}
        placeholder="Select a restaurant"
        loading={loadingRest}
        style={{ width: 300 }}
        onChange={() => {}}
      >
        {restaurants.map((item) => {
          return <Option value={item.id}>{item.name}</Option>;
        })}
      </Select>
      {curRest && ( //短路方法：如果curRest这个value有值（true），才会运行后面，如果是false（没有选择餐厅），直接不运行
        <List
          style={{ marginTop: 20 }}
          loading={loading}
          grid={{
            //根据用户屏幕来选择显示多少餐厅
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 3,
            xxl: 3,
          }}
          dataSource={foodData} //显示食物的图片和价格（数据）
          renderItem={(
            item //list有renderItem可以帮你写map，不用像上面select一样（line85）需要自己写，卡片里面有图片等等信息
          ) => (
            <List.Item>
              <Card
                title={item.name}
                extra={<AddToCartButton itemId={item.id} />}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{ width: "100%", display: "block" }}
                />
                {`Price: ${item.price}`}
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default FoodList;
