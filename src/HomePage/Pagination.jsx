import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <>
    <div className="pagination" style={{ display: 'block', marginTop: '20px', textAlign: 'center', padding: '20px' }}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            margin: '10px 5px',
            padding: '10px 15px',
            backgroundColor: page === currentPage ? '#198754' : '#f2f2f2',
            color: page === currentPage ? '#fff' : '#000',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer',
            gap: '10px',
                    }}
        >
          {page}
        </button>
      ))}
    </div>
    
    </>
  );
};
export default Pagination;