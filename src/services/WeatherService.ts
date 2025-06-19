import axios from 'axios';

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
  updatedAt: string;
}

const WEATHER_CODES: Record<number, {description: string; icon: string}> = {
  0: {description: 'Trời quang', icon: '☀️'},
  1: {description: 'Ít mây', icon: '🌤️'},
  2: {description: 'Nhiều mây', icon: '⛅'},
  3: {description: 'Âm u', icon: '☁️'},
  45: {description: 'Sương mù', icon: '🌫️'},
  61: {description: 'Mưa nhỏ', icon: '🌧️'},
  63: {description: 'Mưa vừa', icon: '🌧️'},
  80: {description: 'Mưa rào nhẹ', icon: '🌦️'},
};

export const getCurrentWeather = async (
  lat: number = 20.129082,
  lon: number = 106.27859,
): Promise<WeatherData> => {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,weather_code',
        hourly: 'temperature_2m', // Thêm dòng này để đảm bảo có dữ liệu nhiệt độ
        timezone: 'auto',
      },
    });

    console.log('API Response:', response.data); // Log để debug

    const current = response.data.current;
    if (!current) {
      throw new Error('Không tìm thấy dữ liệu thời tiết hiện tại');
    }

    // Sử dụng dữ liệu nhiệt độ từ nguồn ưu tiên
    const temperature =
      current.temperature_2m || response.data.hourly?.temperature_2m?.[0] || 0;

    const weatherCode = current.weather_code || 0;

    return {
      temperature,
      humidity: current.relative_humidity_2m || 0,
      description: WEATHER_CODES[weatherCode]?.description || 'Không xác định',
      icon: WEATHER_CODES[weatherCode]?.icon || '❓',
      updatedAt: new Date().toLocaleTimeString('vi-VN'),
    };
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu thời tiết:', error);
    throw new Error('Không thể tải dữ liệu thời tiết. Vui lòng thử lại sau.');
  }
};
