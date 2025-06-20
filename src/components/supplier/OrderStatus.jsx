import React from 'react'

export default function OrderStatus() {
  return (
    <>
      <div class="p-4 " style={{width: "-webkit-fill-available"}}>
        <h5 class="mb-4 text-capitalize">orders status</h5>
        <div class="table-responsive">
          <table class="table table-bordered bg-white">
            <thead class="table-light">
              <tr>
                <th>ORDER ID</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#96459761</td>
                <td class="status-pending">PENDING</td>
                <td>Dec 30, 2025 07:52</td>
                <td>EGP45988 (bulk)</td>
              </tr>
              <tr>
                <td>#17667167</td>
                <td class="status-purchased">PURCHASED</td>
                <td>Dec 7, 2025 22:26</td>
                <td>EGP500 (bulk)</td>
              </tr>
              <tr>
                <td>#95214362</td>
                <td class="status-cancelled">CANCELLED</td>
                <td>Dec 7, 2025 23:26</td>
                <td>EGP550 (bulk)</td>
              </tr>
              <tr>
                <td>#17667167</td>
                <td class="status-shipped">SHIPPED</td>
                <td>Feb 2, 2025 19:28</td>
                <td>EGP2400 (bulk)</td>
              </tr>
              <tr>
                <td>#51746385</td>
                <td class="status-arrived">ARRIVED</td>
                <td>Dec 30, 2025 07:52</td>
                <td>EGP3400 (bulk)</td>
              </tr>
              <tr>
                <td>#51746385</td>
                <td class="status-pending">PENDING</td>
                <td>Dec 4, 2025 21:42</td>
                <td>EGP9900 (bulk)</td>
              </tr>
              <tr>
                <td>#673971743</td>
                <td class="status-completed">COMPLETED</td>
                <td>Feb 2, 2025 19:28</td>
                <td>EGP550 (bulk)</td>
              </tr>
              <tr>
                <td>#673971743</td>
                <td class="status-shipped">SHIPPED</td>
                <td>Mar 20, 2025 23:14</td>
                <td>EGP800 (bulk)</td>
              </tr>
              <tr>
                <td>#673971743</td>
                <td class="status-arrived">ARRIVED</td>
                <td>Dec 4, 2025 21:42</td>
                <td>EGP7500 (bulk)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </>
)
}
