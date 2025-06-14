import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import Spinner from "../../components/loading/Spinner";
import FAQSellerSkeleton from "../../components/skeleton/FAQSellerSkeleton";
import EmptyStateText from "../../components/empty_state/EmptyStateText";
import Heading from "../../components/heading/Heading";
import useFaqs from "../../hooks/faqs/useFaqs";

function SellerFAQs() {
  const { getSellerFAQs, ansFAQ, isLoading } = useFaqs();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loadingFAQId, setLoadingFAQId] = useState(null);
  const [answeredFAQ, setAnsweredFAQ] = useState([]);
  const [unansweredFAQ, setUnansweredFAQ] = useState([]);
  const [isDataFetching, setIsDataFetching] = useState(true);

  const submitAnswer = async (faqId) => {
    setLoadingFAQId(faqId);

    const isSuccess = await ansFAQ(faqId, answer);
    if (isSuccess) {
      setUnansweredFAQ((prev) => prev.filter((data) => data._id !== faqId));
      const answeredData = unansweredFAQ.find((data) => data._id === faqId);
      if (answeredData) {
        answeredData.answer = answer;
        setAnsweredFAQ((prev) => [...prev, answeredData]);
      }
      setOpenFAQ(null);
      setAnswer("");
    }

    setLoadingFAQId(null);
  };

  const fetchFAQs = async () => {
    try {
      const answered = await getSellerFAQs(true);
      const unanswered = await getSellerFAQs(false);

      setAnsweredFAQ(answered || []);
      setUnansweredFAQ(unanswered || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setIsDataFetching(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <>
      <Heading text="Your FAQs" textAlign="text-left" />
      {isDataFetching ? (
        <FAQSellerSkeleton />
      ) : unansweredFAQ.length === 0 && answeredFAQ.length === 0 ? (
        <EmptyStateText text="Looks like your FAQ section is empty. No questions yet! But don't worry, once users start asking about your products, you'll find them here." />
      ) : (
        <div className="px-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {unansweredFAQ.map((data) => (
            <div key={data._id} className="flex flex-row gap-4 bg-gray-100 rounded p-4">
              <div className="w-8 h-8 flex justify-center">
                <MdOutlineKeyboardArrowDown
                  className={`text-3xl cursor-pointer text-red-700 p-[1px] bg-red-200 rounded-sm ${
                    data._id === openFAQ ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setOpenFAQ(data._id === openFAQ ? null : data._id)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="font-medium flex gap-2 items-center">
                  <span>{data.question}</span>
                  <Link
                    to={`/category/product/details/${data.productId}`}
                    target="_blank"
                    className="text-xs flex justify-center items-center text-red-600 px-[6px] py-[1px] border border-red-600 rounded-full"
                  >
                    See Product
                  </Link>
                </span>
                <span
                  className={`text-sm text-gray-700 flex flex-col gap-2 ${
                    data._id === openFAQ ? "block" : "hidden"
                  }`}
                >
                  <textarea
                    placeholder="Answer here..."
                    className="h-32 w-full outline-none rounded-md bg-transparent border border-gray-500 p-2 text-sm text-gray-700"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <button
                    className="bg-red-600 text-white py-2 font-medium rounded-md flex flex-row justify-center items-center"
                    onClick={() => submitAnswer(data._id)}
                  >
                    {loadingFAQId === data._id && <Spinner width="w-5" color="#ffffff" />}
                    Submit
                  </button>
                </span>
              </div>
            </div>
          ))}
          {answeredFAQ.map((data) => (
            <div key={data._id} className="flex flex-row gap-4 bg-gray-100 rounded p-4">
              <div className="w-8 h-8 flex justify-center">
                <MdOutlineKeyboardArrowDown
                  className={`text-3xl cursor-pointer text-green-700 p-[1px] bg-green-200 rounded-sm ${
                    data._id === openFAQ ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setOpenFAQ(data._id === openFAQ ? null : data._id)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <span className="font-medium flex gap-2 items-center">
                  <span>{data.question}</span>
                  <Link
                    to={`/category/product/details/${data.productId}`}
                    target="_blank"
                    className="text-xs flex justify-center items-center text-green-700 px-[6px] py-[1px] border border-green-700 rounded-full"
                  >
                    See Product
                  </Link>
                </span>
                <span
                  className={`text-sm text-gray-700 flex flex-col gap-2 ${
                    data._id === openFAQ ? "block" : "hidden"
                  }`}
                >
                  {data.answer}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SellerFAQs;
