// import axios from "axios";
//
// export interface ReviewDTO {
//     authorName: string;
//     content: string;
//     createdAt: string;
//     mentor: string;
//     rate: number;
//     title: string;
// }
//
//
//
// // export const submitReview = async (token: string, reviewData: ReviewDTO) => {
// //     try {
// //         const response = await axios.post(`/api/review/submit`, reviewData, {
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             params: {
// //                 token: token,
// //             },
// //         });
// //         return response.data;
// //     } catch (error) {
// //         console.error('Error submitting review:', error);
// //         throw error;
// //     }
// // };