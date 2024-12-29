import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getTeachersQuery } from "../apollo/queries/teachers";
import { deleteTeacherMutation, createTeacherMutation, updateTeacherMutation } from "../apollo/mutations/teachers";

const TeachersPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [teacherName, setTeacherName] = useState('');
    const [editTeacher, setEditTeacher] = useState({ id: null, name: '' });

    const { loading, error, data, refetch } = useQuery(getTeachersQuery, {
        variables: { skip: page * rowsPerPage, take: rowsPerPage },
        context: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
    });

    const [deleteTeacher] = useMutation(deleteTeacherMutation);
    const [createTeacher] = useMutation(createTeacherMutation);
    const [updateTeacher] = useMutation(updateTeacherMutation);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async () => {
        if (selectedTeacherId) {
            await deleteTeacher({
                variables: { deleteTeacherId: selectedTeacherId },
                context: { headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` } }
            });
            setOpenModal(false);
            await refetch({ take: rowsPerPage, skip: page * rowsPerPage });
        }
    };

    const handleCreateTeacher = async () => {
        if (teacherName.trim()) {
            await createTeacher({
                variables: { name: teacherName.trim() },
                context: { headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` } }
            });
            setOpenCreateDialog(false);
            setTeacherName('');
            await refetch({ take: rowsPerPage, skip: page * rowsPerPage });
        }
    };

    const handleEditTeacher = async () => {
        if (editTeacher.name.trim()) {
            await updateTeacher({
                variables: { updateTeacherId: editTeacher.id, name: editTeacher.name.trim() },
                context: { headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` } }
            });
            setOpenEditDialog(false);
            setEditTeacher({ id: null, name: '' });
            await refetch({ take: rowsPerPage, skip: page * rowsPerPage });
        }
    };

    const handleOpenEditDialog = (teacher) => {
        setEditTeacher(teacher);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditTeacher({ id: null, name: '' });
    };

    const handleOpenModal = (teacherId) => {
        setSelectedTeacherId(teacherId);
        setOpenModal(true);
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleOpenCreateDialog = () => setOpenCreateDialog(true);

    const handleCloseCreateDialog = () => setOpenCreateDialog(false);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;

    console.info(data)

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Button variant="contained" color="primary" onClick={handleOpenCreateDialog} sx={{ mb: 2 }}>
                Add New Teacher
            </Button>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="teachers table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Subjects</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.teachers.teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                                <TableCell component="th" scope="row">{teacher.id}</TableCell>
                                <TableCell>{teacher.name}</TableCell>
                                <TableCell>
                                    {teacher.subjects.map(subject => subject.name).join(', ')}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpenEditDialog(teacher)} color="primary" aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenModal(teacher.id)} color="secondary" aria-label="delete">
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
                count={data.teachers.totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this teacher?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog} fullWidth maxWidth="sm">
                <DialogTitle>Create New Teacher</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        label="Teacher's Name"
                        type="text"
                        variant="outlined"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        placeholder="Enter teacher's name"
                        inputProps={{ style: { fontSize: 18 } }}
                        sx={{ mt: 2, mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateDialog} color="primary">Cancel</Button>
                    <Button onClick={handleCreateTeacher} color="primary" variant="contained">Create</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
                <DialogTitle>Edit Teacher</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        label="Teacher's Name"
                        type="text"
                        variant="outlined"
                        value={editTeacher.name}
                        onChange={(e) => setEditTeacher({ ...editTeacher, name: e.target.value })}
                        placeholder="Update teacher's name"
                        inputProps={{ style: { fontSize: 18 } }}
                        sx={{ mt: 2, mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">Cancel</Button>
                    <Button onClick={handleEditTeacher} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default TeachersPage;
