import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TablePagination, Typography, Dialog, DialogActions, DialogContent, DialogTitle,
    Button, TextField, MenuItem, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getSubjectsQuery } from "../apollo/queries/subjects";
import { getTeachersQuery } from "../apollo/queries/teachers";
import { deleteSubjectMutation, createSubjectMutation, updateSubjectMutation } from "../apollo/mutations/subjects";

const SubjectsPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [subjectName, setSubjectName] = useState('');
    const [teacherId, setTeacherId] = useState('');

    const { loading, error, data, refetch } = useQuery(getSubjectsQuery, {
        variables: { skip: page * rowsPerPage, take: rowsPerPage },
        context: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
    });

    const { data: teachersData } = useQuery(getTeachersQuery, {
        context: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
    });

    const [deleteSubject] = useMutation(deleteSubjectMutation);
    const [createSubject] = useMutation(createSubjectMutation);
    const [updateSubject] = useMutation(updateSubjectMutation);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async () => {
        if (selectedSubjectId) {
            await deleteSubject({
                variables: { deleteSubjectId: selectedSubjectId },
                context: {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            });

            setOpenModal(false);
            await refetch({ take: rowsPerPage, skip: page * rowsPerPage });
        }
    };

    const handleCreateSubject = async () => {
        try {
            await createSubject({
                variables: {
                    name: subjectName,
                    teacherId: parseInt(teacherId, 10)
                },
                context: {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            });

            setOpenCreateDialog(false);
            setSubjectName('');
            setTeacherId('');
            await refetch({ take: rowsPerPage, skip: page * rowsPerPage });
        } catch (error) {
            console.error("Error creating subject:", error);
        }
    };

    const handleEditSubject = async () => {
        try {
            if(subjectName && teacherId) {
                await updateSubject({
                    variables: {
                        updateSubjectId: selectedSubjectId,
                        name: subjectName,
                        teacherId: parseInt(teacherId, 10)
                    },
                    context: {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }
                });

                setOpenEditDialog(false);
                setSubjectName('');
                setTeacherId('');
                await refetch({ take: rowsPerPage, skip: page * rowsPerPage });
            }
        } catch (error) {
            console.error("Error updating subject:", error);
        }
    };

    const handleOpenModal = (subjectId) => {
        setSelectedSubjectId(subjectId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedSubjectId(null);
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = () => {
        setOpenCreateDialog(false);
        setSubjectName('');
        setTeacherId('');
    };

    const handleOpenEditDialog = (subject) => {
        setSelectedSubjectId(subject.id);
        setSubjectName(subject.name);
        setTeacherId(subject.teacher.id.toString());
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSubjectName('');
        setTeacherId('');
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Button variant="contained" color="primary" onClick={handleOpenCreateDialog} sx={{ mb: 2 }}>
                Add New Subject
            </Button>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="subjects table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Teacher</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.subjects.subjects.map((subject) => (
                            <TableRow key={subject.id}>
                                <TableCell component="th" scope="row">{subject.id}</TableCell>
                                <TableCell>{subject.name}</TableCell>
                                <TableCell>{subject.teacher.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpenEditDialog(subject)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenModal(subject.id)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.subjects.totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this subject?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} fullWidth maxWidth="sm">
                <DialogTitle>Create New Subject</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Subject Name"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        select
                        label="Teacher"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                    >
                        {teachersData?.teachers.teachers.map((teacher) => (
                            <MenuItem key={teacher.id} value={teacher.id}>
                                {teacher.name} (ID: {teacher.id})
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog} color="primary">Cancel</Button>
                    <Button onClick={handleCreateSubject} color="primary" variant="contained">Create</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
                <DialogTitle>Edit Subject</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Subject Name"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        select
                        label="Teacher"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                    >
                        {teachersData?.teachers.teachers.map((teacher) => (
                            <MenuItem key={teacher.id} value={teacher.id}>
                                {teacher.name} (ID: {teacher.id})
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">Cancel</Button>
                    <Button onClick={handleEditSubject} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default SubjectsPage;
