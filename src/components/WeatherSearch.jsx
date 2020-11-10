import React, { useState } from "react";
import { Form, Button, Select, Input } from "antd";
import "./WeatherSearch.css";
import Axios from "axios";
import Forecast from "./Forecast";

const { Option } = Select;

const api = (() => {
  const KEY = process.env.REACT_APP_WEATHER_API_KEY;
  return {
    getForecast: (cityName) =>
      Axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${KEY}`
      ),
  };
})();

const WeatherSearch = () => {
  const [forecast, setForecast] = useState({});
  const [showForecast, setShowForecast] = useState(false);
  const [showAltInput, setShowAltInput] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const errorStatus = hasErrors ? 'error' : 'success';

  const onFinish = (values) => {
    if (values.City) {
      const cityName =
        values.City === "other" ? values.Alt.toLowerCase() : values.City;
      api.getForecast(cityName).then((res) => {
        if (res.status !== 200) {
            setHasErrors(true)
        } else {
            setForecast(res.data);
            setShowForecast(true);
            setHasErrors(false)
        }
      });
    }
  };

  const onDDChange = (value) => {
    if (value === 'other') {
        setShowAltInput(true);
    } else {
        setShowAltInput(false);
    }
  };

  return (
    <div className="WeatherSearch">
      {showForecast ? (
        <Forecast data={forecast} setShowForecast={setShowForecast} setShowAltInput={setShowAltInput} />
      ) : (
        <Form
          name="basic"
          layout="inline"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="City">
            <Select onChange={onDDChange} placeholder="Select a City">
              <Option value="london">London</Option>
              <Option value="berlin">Berlin</Option>
              <Option value="tokyo">Tokyo</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          {showAltInput ? (
            <Form.Item name="Alt"
            validateStatus={errorStatus}
            help={hasErrors ? "Couldn't find your city" : ''}>
              <Input placeholder="Type city name" onChange={() => setHasErrors(false)}/>
            </Form.Item>
          ) : (
            ""
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default WeatherSearch;
