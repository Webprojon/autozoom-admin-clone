import { useEffect, useState } from "react";

export const BASE_URL = "https://autoapi.dezinfeksiyatashkent.uz/api";

type CategoryType = {
	name_en: string;
};

type ModelAndCityType = {
	name: string;
};

interface DataType {
	id: string;
	text: string;
	name: string;
	title: string;
	color: string;
	name_ru: string;
	name_en: string;
	image_src: string;
	brand_title: string;
	category: CategoryType;
	model: ModelAndCityType;
	city: ModelAndCityType;
}

export const useFetch = (url: string) => {
	const [data, setData] = useState<DataType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		const controller = new AbortController();
		const fetchData = async () => {
			try {
				const response = await fetch(`${BASE_URL}/${url}`, {
					signal: controller.signal,
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setData(data.data);
				setError(null);
			} catch (error: unknown) {
				if (error instanceof DOMException && error.name === "AbortError") {
					console.log("Fetch aborted");
				} else {
					console.error(error);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchData();

		return () => controller.abort();
	}, [url]);

	return { data, setData, loading, error };
};
