
import React, { useEffect, useState } from 'react';
import { FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  deleteAllResumeApi,
  getAllResumeApi
} from '../service/apiService';

function Saved() {
  const [allResumes, setAllResumes] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');

  // Fetch all saved resumes
  const getAllResumes = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getAllResumeApi();

      if (response.status === 200) {
        setAllResumes(response.data);
      }
    } catch (err) {
      console.error('Error fetching resumes:', err);
      setError('Unable to load resumes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllResumes();
  }, []);

  // Search resumes by job role or candidate name
  const filteredResumes = allResumes.filter((resume) => {
    const search = searchKey.toLowerCase().trim();

    return (
      (resume.fullname || '').toLowerCase().includes(search) ||
      (resume.job || '').toLowerCase().includes(search)
    );
  });

  // Delete a resume
  const removeResume = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this resume?'
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await deleteAllResumeApi(id);

      if (response.status === 200 || response.status === 204) {
        setAllResumes((prev) =>
          prev.filter((resume) => resume.id !== id)
        );
      } else {
        alert('Unable to delete the resume. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting resume:', err);
      alert('Failed to delete the resume. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container py-5">

      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

        <div>
          <h2 className="fw-bold mb-1">Saved Resumes</h2>
          <p className="text-secondary mb-0">
            Manage and view all your saved resumes.
          </p>
        </div>

        <div className="text-md-end">
          <span className="badge bg-dark fs-6 px-3 py-2">
            {filteredResumes.length} Resumes
          </span>
        </div>

      </div>

      {/* Search Bar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">

          <div className="input-group">

            <span className="input-group-text bg-white">
              <FaSearch className="text-secondary" />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search by candidate name or job role..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />

            {searchKey && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSearchKey('')}
              >
                Clear
              </button>
            )}

          </div>

        </div>
      </div>

      {/* Resume Table */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-0">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-dark">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3">Candidate</th>
                  <th className="py-3">Job Role</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>

                {/* Loading State */}
                {loading && (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <div
                        className="spinner-border text-dark"
                        role="status"
                      >
                        <span className="visually-hidden">
                          Loading...
                        </span>
                      </div>

                      <p className="text-secondary mt-2 mb-0">
                        Loading resumes...
                      </p>
                    </td>
                  </tr>
                )}

                {/* Error State */}
                {!loading && error && (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <p className="text-danger mb-3">{error}</p>

                      <button
                        className="btn btn-dark"
                        onClick={getAllResumes}
                      >
                        Try Again
                      </button>
                    </td>
                  </tr>
                )}

                {/* Resume List */}
                {!loading &&
                  !error &&
                  filteredResumes.length > 0 &&
                  filteredResumes.map((resume, index) => (
                    <tr key={resume.id}>

                      <td className="px-4 text-secondary">
                        {index + 1}
                      </td>

                      <td>
                        <Link
                          to={`/resume/${resume.id}`}
                          className="text-decoration-none text-dark fw-semibold"
                        >
                          {resume.fullname || 'Unnamed Candidate'}
                        </Link>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark border">
                          {resume.job || 'Not specified'}
                        </span>
                      </td>

                      <td className="text-center">

                        <div className="d-flex justify-content-center gap-2">

                          <Link
                            to={`/resume/${resume.id}`}
                            className="btn btn-sm btn-outline-dark"
                          >
                            View
                          </Link>

                          <button
                            onClick={() => removeResume(resume.id)}
                            className="btn btn-sm btn-outline-danger"
                            disabled={deletingId === resume.id}
                            title="Delete resume"
                          >
                            {deletingId === resume.id ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-label="Deleting"
                              />
                            ) : (
                              <FaTrash />
                            )}
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                {/* Empty State */}
                {!loading &&
                  !error &&
                  filteredResumes.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-5">

                        <div className="mb-3">
                          <FaSearch
                            size={30}
                            className="text-secondary"
                          />
                        </div>

                        <h5 className="fw-semibold">
                          {searchKey
                            ? 'No matching resumes found'
                            : 'No resumes yet'}
                        </h5>

                        <p className="text-secondary mb-0">
                          {searchKey
                            ? 'Try searching with another name or job role.'
                            : 'Your saved resumes will appear here.'}
                        </p>

                      </td>
                    </tr>
                  )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Saved;
