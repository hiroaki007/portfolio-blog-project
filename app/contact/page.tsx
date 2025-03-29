"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { div, form, p } from "framer-motion/client";

type FormData = {
  name: string;
  email: string;
  message: string;
}


export default function Contact() {
    
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();
  
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Contact-Type" : "application/json"},
                body: JSON.stringify(data),
            });

            if(res.ok) {
                setIsSubmitted(true);
            } else {
                console.error("送信に失敗しました");
            }
        } catch (error) {
            console.error("エラーが発生しました。", error);
        }
    };

  
    return (
        <motion.section 
            className="container mx-auto py-10 px-4 my-8"
            initial= {{ opacity: 0, y: 20 }}
            animate= {{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-5xl font-bold text-center mb-6 mt-10">お問い合わせ</h1>
            <p className="text-gray-600 text-center mb-8">
            ご質問・ご依頼は以下のフォームからお気軽にお問い合わせください。
            </p>

            {isSubmitted ? (
                <div className="text-center text-green-600 font-semibold">
                    送信が完了しました。ご連絡ありがとうございます。
                </div>
            ) : (
                
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
                >
                    {/* お名前 */}
                    <div className="mb-4">

                        <label className="block text-gray-700 dark:text-white font-semibold">
                            お名前
                        </label>

                        <input 
                            type="text" 
                            {...register("name", { required: "お名前を入力してください"})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}

                    </div>

                    {/* メールアドレス */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-white font-semibold">
                            メールアドレス
                        </label>

                        <input 
                            type="email" 
                            {...register("email", {
                                required: "メールアドレスを入力してください",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "有効なメールアドレスを入力してください",
                                },
                            })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 "
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}

                    </div>

                    {/* メッセージ */}

                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-white font-semibold">
                            メッセージ
                        </label>

                        <textarea
                            {...register("message", { required: "メッセージを入力してください" })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={4}
                        >
                        </textarea>

                        {errors.message && (
                            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                        )}

                    </div>

                    {/* 送信ボタン */}

                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "送信中..." : "送信する"}
                    </button>

                </form>

            )}

        </motion.section>
    );
}

