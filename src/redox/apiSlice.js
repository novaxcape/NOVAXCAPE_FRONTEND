import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const centres = [
  { id:'static-1', centreName:'Lekki Conservation Centre', city:'Lagos', state:'Lagos', imagesPublicUrl:['/novaxcape/lekki.png'], rating:5, averageRating:5, reviews:567, reviewCount:567, price:2500, openingHours:'8:30 AM - 5:00 PM' },
  { id:'static-2', centreName:'Yankari National Park', city:'Bauchi', state:'Bauchi', imagesPublicUrl:['/novaxcape/yankari.png'], rating:4, averageRating:4, reviews:213, reviewCount:213, price:2000, openingHours:'8:30 AM - 7:00 PM' },
  { id:'static-3', centreName:'Olumo Rock', city:'Abeokuta', state:'Ogun', imagesPublicUrl:['/novaxcape/olumo.png'], rating:5, averageRating:5, reviews:400, reviewCount:400, price:2000, openingHours:'9:00 AM - 6:00 PM' },
  { id:'static-4', centreName:'Obudu Mountain Resort', city:'Cross River', state:'Cross River', imagesPublicUrl:['/novaxcape/obudu.png'], rating:4.5, averageRating:4.5, reviews:200, reviewCount:200, price:3000, openingHours:'10:30 AM - 5:00 PM' },
  { id:'static-5', centreName:'Green Legacy Resort', city:'Abeokuta', state:'Ogun', imagesPublicUrl:['/novaxcape/greenLegacy.png'], rating:4, averageRating:4, reviews:122, reviewCount:122, price:1500, openingHours:'8:30 AM - 10:00 PM' },
  { id:'static-6', centreName:'Omu Resort', city:'Lagos', state:'Lagos', imagesPublicUrl:['/novaxcape/omu.png'], rating:5, averageRating:5, reviews:567, reviewCount:567, price:2500, openingHours:'8:30 AM - 5:00 PM' },
];
const staticBookings = [{ id:'booking-1', bookingId:'booking-1', status:'Confirmed', bookingStatus:'Confirmed', centreName:'Lekki Conservation Centre', touristCentreName:'Lekki Conservation Centre', date:'2026-10-14', amount:2500 }];
const staticPackages = [{ id:'package-1', packageName:'Adult Ticket', packageType:'Adult', amount:2500, numberOfPeople:1 }];
const staticReviews = [{ id:'review-1', rating:5, comment:'A beautiful experience.', userName:'Ada' }];
const result = (value) => async () => value;
const makeThunk = (name, value) => createAsyncThunk(`static/${name}`, result(value));

export const googleAuthUrl = '#';
export const updateClientProfile=makeThunk('updateClientProfile',{ success:true });
export const logoutClient=makeThunk('logoutClient',{ success:true });
export const logoutVendor=makeThunk('logoutVendor',{ success:true });
export const forgotClientPassword=makeThunk('forgotClientPassword',{ success:true });
export const resetClientPassword=makeThunk('resetClientPassword',{ success:true });
export const changeClientPassword=makeThunk('changeClientPassword',{ success:true });
export const getGoogleCallback=makeThunk('getGoogleCallback',{ success:true });
export const updateVendorProfile=makeThunk('updateVendorProfile',{ success:true });
export const getVendorDetails=makeThunk('getVendorDetails',{ data:{ name:'Novaxcape Centre' } });
export const forgotVendorPassword=makeThunk('forgotVendorPassword',{ success:true });
export const resetVendorPassword=makeThunk('resetVendorPassword',{ success:true });
export const changeVendorPassword=makeThunk('changeVendorPassword',{ success:true });
export const createPackage=makeThunk('createPackage',{ data:staticPackages[0] });
export const getAllPackages=makeThunk('getAllPackages',{ data:staticPackages });
export const getPackageById=makeThunk('getPackageById',{ data:staticPackages[0] });
export const updatePackage=makeThunk('updatePackage',{ success:true });
export const deletePackage=makeThunk('deletePackage',{ success:true });
export const registerTouristCenter=makeThunk('registerTouristCenter',{ data:centres[0] });
export const getTouristCentersByState=makeThunk('getTouristCentersByState',{ data:centres });
export const getTouristCenterById=makeThunk('getTouristCenterById',{ data:centres[0] });
export const getVendorTouristCenters=makeThunk('getVendorTouristCenters',{ data:centres });
export const getVendorAllCentres=makeThunk('getVendorAllCentres',{ data:centres });
export const updateTouristCenter=makeThunk('updateTouristCenter',{ success:true });
export const deleteTouristCenter=makeThunk('deleteTouristCenter',{ success:true });
export const getTouristCentersByOpeningHours=makeThunk('getTouristCentersByOpeningHours',{ data:centres });
export const createKyc=makeThunk('createKyc',{ success:true });
export const getKycStatus=makeThunk('getKycStatus',{ data:{ status:'Pending' } });
export const createPaymentPlan=makeThunk('createPaymentPlan',{ success:true });
export const getPaymentPlans=makeThunk('getPaymentPlans',{ data:[] });
export const createBooking=makeThunk('createBooking',{ data:staticBookings[0] });
export const getAllClientBookings=makeThunk('getAllClientBookings',{ data:staticBookings });
export const getUserBookings=makeThunk('getUserBookings',{ data:staticBookings });
export const getVendorBookings=makeThunk('getVendorBookings',{ data:staticBookings });
export const getBookingById=makeThunk('getBookingById',{ data:staticBookings[0] });
export const cancelBooking=makeThunk('cancelBooking',{ success:true });
export const verifyPasscode=makeThunk('verifyPasscode',{ success:true });
export const initializePayment=makeThunk('initializePayment',{ data:{ authorization_url:'#', reference:'static-reference' } });
export const verifyPayment=makeThunk('verifyPayment',{ success:true });
export const getPaymentStatus=makeThunk('getPaymentStatus',{ data:{ status:'success' } });
export const getInstallmentPaymentStatus=makeThunk('getInstallmentPaymentStatus',{ data:{ status:'success' } });
export const createReview=makeThunk('createReview',{ data:staticReviews[0] });
export const getAllReviews=makeThunk('getAllReviews',{ data:staticReviews });
export const getReviewById=makeThunk('getReviewById',{ data:staticReviews[0] });
export const getReviewsByRating=makeThunk('getReviewsByRating',{ data:staticReviews });
export const getRatingStatistics=makeThunk('getRatingStatistics',{ data:{ averageRating:4.7, totalReviews:567 } });

const initialState = { clientProfile:null, clientLoading:false, clientError:null, clientSuccessMessage:null, clientResetLoading:false, clientResetError:null, vendorProfile:{ name:'Novaxcape Centre' }, vendorLoading:false, vendorError:null, vendorSuccessMessage:null, vendorCentres:centres, vendorResetLoading:false, vendorResetError:null, packages:staticPackages, selectedPackage:staticPackages[0], packagesLoading:false, packagesError:null, touristCentres:centres, selectedTouristCenter:centres[0], touristCentresLoading:false, touristCentresError:null, createdTouristCenter:null, kyc:{status:'Pending'}, kycLoading:false, kycError:null, paymentPlans:[], paymentPlan:null, paymentPlanLoading:false, paymentPlanError:null, userBookings:staticBookings, vendorBookings:staticBookings, vendorBookingPagination:{}, clientBookings:staticBookings, booking:staticBookings[0], bookingLoading:false, bookingError:null, paymentLoading:false, paymentError:null, paymentReference:'static-reference', paymentVerified:true, paymentData:{status:'success'}, reviews:staticReviews, reviewsLoading:false, reviewsError:null, reviewStatistics:{averageRating:4.7,totalReviews:567}, googleCallback:null, loading:false, error:null, successMessage:null };
const apiSlice = createSlice({ name:'api', initialState, reducers:{ clearClientError:s=>{s.clientError=null}, clearClientSuccess:s=>{s.clientSuccessMessage=null}, clearVendorError:s=>{s.vendorError=null}, clearVendorSuccess:s=>{s.vendorSuccessMessage=null}, clearApiError:s=>{s.error=null}, clearApiSuccess:s=>{s.successMessage=null}, resetApiState:()=>initialState, clearPaymentData:s=>{s.paymentData=null} } });
export const { clearClientError, clearClientSuccess, clearVendorError, clearVendorSuccess, clearApiError, clearApiSuccess, resetApiState, clearPaymentData } = apiSlice.actions;
const pick = key => state => state.api?.[key];
export const selectClientProfile=pick('clientProfile'); export const selectClientLoading=pick('clientLoading'); export const selectClientError=pick('clientError'); export const selectClientSuccess=pick('clientSuccessMessage'); export const selectClientResetLoading=pick('clientResetLoading'); export const selectClientResetError=pick('clientResetError'); export const selectVendorProfile=pick('vendorProfile'); export const selectVendorLoading=pick('vendorLoading'); export const selectVendorError=pick('vendorError'); export const selectVendorSuccess=pick('vendorSuccessMessage'); export const selectVendorCentres=pick('vendorCentres'); export const selectVendorResetLoading=pick('vendorResetLoading'); export const selectVendorResetError=pick('vendorResetError'); export const selectPackages=pick('packages'); export const selectSelectedPackage=pick('selectedPackage'); export const selectPackagesLoading=pick('packagesLoading'); export const selectPackagesError=pick('packagesError'); export const selectTouristCentres=pick('touristCentres'); export const selectSelectedTouristCenter=pick('selectedTouristCenter'); export const selectTouristCentresLoading=pick('touristCentresLoading'); export const selectTouristCentresError=pick('touristCentresError'); export const selectCreatedTouristCenter=pick('createdTouristCenter'); export const selectKyc=pick('kyc'); export const selectKycLoading=pick('kycLoading'); export const selectKycError=pick('kycError'); export const selectPaymentPlans=pick('paymentPlans'); export const selectPaymentPlan=pick('paymentPlan'); export const selectPaymentPlanLoading=pick('paymentPlanLoading'); export const selectPaymentPlanError=pick('paymentPlanError'); export const selectUserBookings=pick('userBookings'); export const selectVendorBookings=pick('vendorBookings'); export const selectVendorBookingPagination=pick('vendorBookingPagination'); export const selectClientBookings=pick('clientBookings'); export const selectBooking=pick('booking'); export const selectBookingLoading=pick('bookingLoading'); export const selectBookingError=pick('bookingError'); export const selectPaymentLoading=pick('paymentLoading'); export const selectPaymentError=pick('paymentError'); export const selectPaymentReference=pick('paymentReference'); export const selectPaymentVerified=pick('paymentVerified'); export const selectPaymentData=pick('paymentData'); export const selectReviews=pick('reviews'); export const selectReviewsLoading=pick('reviewsLoading'); export const selectReviewsError=pick('reviewsError'); export const selectReviewStatistics=pick('reviewStatistics'); export const selectGoogleCallback=pick('googleCallback'); export const selectApiLoading=pick('loading'); export const selectApiError=pick('error'); export const selectApiSuccess=pick('successMessage');
export default apiSlice.reducer;
