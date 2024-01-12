import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllWatchlists,
  fetchWatchlistDetails,
} from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import DeleteWatchListModalWatchListModal from "./DeleteModal";
import "./watchlistDetails.css";
import Watchlist from "../Watchlists";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import DeleteCompanyFromWatchListModal from "./DeleteModal";

const WatchlistDetails = () => {
  const { watchlist_id } = useParams();


  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const watchlists = useSelector((state) => state.watchlists.allWatchlists);


  const currentWatchlistDetails = useSelector(
    (state) => state.watchlists?.currentWatchlist
  );


  let currentWatchlist;

  if (watchlists?.length) {
    watchlists?.forEach((watchlist) => {

      if (watchlist.id == watchlist_id) currentWatchlist = watchlist.name;
    });
  }

  useEffect(() => {
    dispatch(fetchAllWatchlists(sessionUser?.id));
    dispatch(fetchWatchlistDetails(watchlist_id));
  }, [dispatch, watchlist_id, sessionUser?.id]);

  return (
		<>
			{sessionUser && currentWatchlistDetails && (
				<div className="watchlist-details-container">
					<div className="current-watchlist-left-container">
						<div className="current-watchlist-header-container">
							<div className="current-watchlist-header">{currentWatchlist}</div>
						</div>
						{currentWatchlistDetails ? (
							<div className="watchlist-table-container">
								<table>
									<thead className="legend-row">
										<th>Name</th>
										<th>Symbol</th>
										<th>Price</th>
									</thead>
									<tbody>
										{currentWatchlistDetails.length ? (
											currentWatchlistDetails?.map((company) => (
												<tr key={company.id} className="company-row-container">
													<NavLink exact to={`/companies/${company.id}`}>
														<td className="listdet-company-name">{company.name}</td>
														<td className="listdet-company-symbol">{company.symbol}</td>
														<td className="listdet-company-price">{company.price}</td>
													</NavLink>
													<td className="listdet-company-delete">
														<OpenModalButton
															buttonText="X"
															modalComponent={
																<DeleteCompanyFromWatchListModal companyId={company.id} watchlistId={watchlist_id} />
															}
														></OpenModalButton>
													</td>
												</tr>
											))
										) : (
											<>
												<h2 className="empty-list-message-header">Seems a little empty in here...</h2>
												<p>Search a company and add it to your list!</p>
											</>
										)}
									</tbody>
								</table>
							</div>
						) : (
							<p>no data</p>
						)}
					</div>
					<Watchlist />
				</div>
			)}
		</>
	);
};

export default WatchlistDetails;

//   return (
//     <>
//       {sessionUser && currentWatchlistDetails.length && (
//         <div className="watchlist-details-container">
//           <div className="current-watchlist-left-container">
//             <div className="current-watchlist-header-container">
//               <div className="current-watchlist-header">{currentWatchlist}</div>
//             </div>
//             <div className="watchlist-table-container">
//               <table>
//                 <thead className="legend-row">
//                   <th>Name</th>
//                   <th>Symbol</th>
//                   <th>Price</th>
//                 </thead>
//                 <tbody>
//                   {currentWatchlistDetails.length &&
//                     currentWatchlistDetails?.map((company) => (
//                       <tr key={company.id} className="company-row-container">
//                         <NavLink exact to={`/companies/${company.id}`}>
//                           <td className="listdet-company-name">
//                             {company.name}
//                           </td>
//                           <td className="listdet-company-symbol">
//                             {company.symbol}
//                           </td>
//                           <td className="listdet-company-price">
//                             {company.price}
//                           </td>
//                         </NavLink>
//                         <td className="listdet-company-delete">
//                           <OpenModalButton
//                             buttonText="X"
//                             modalComponent={<DeleteCompanyFromWatchListModal companyId={company.id} watchlistId={watchlist_id}/>}
//                           ></OpenModalButton>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <Watchlist />
//         </div>
//       )}
//     </>
//   );
