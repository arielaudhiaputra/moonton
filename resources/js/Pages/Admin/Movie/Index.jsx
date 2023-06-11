import Authenticated from "@/Layouts/Authenticated/Index";
import SecondaryButton from "@/Components/SecondaryButton";
import { Link, Head, useForm } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ auth, flashMessage, movies }) {
    const { delete: destroy, put } = useForm();

    return (
        <Authenticated auth={auth}>
            <Head title="List of Movie" />

            <Link href={route("admin.dashboard.movie.create")}>
                <SecondaryButton type="button" variant="primary"  className="w-30 mb-8">
                    Insert New Movie
                </SecondaryButton>
            </Link>

            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} />
            )}

            <table className="table-fixed w-full text-center mt-5">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>
                                <img
                                    src={`/storage/${movie.thumbnail}`}
                                    className="w-32 rounded-md"
                                />
                            </td>
                            <td>{movie.name}</td>
                            <td>{movie.category}</td>
                            <td>{movie.rating.toFixed(1)}</td>
                            <td>
                                <Link
                                    href={route(
                                        "admin.dashboard.movie.edit",
                                        movie.id
                                    )}
                                >
                                    <SecondaryButton type="button" variant="warning">
                                        Edit
                                    </SecondaryButton>
                                </Link>
                            </td>
                            <td>
                                <div
                                    onClick={() => {
                                        movie.deleted_at ? put(route("admin.dashboard.movie.restore", movie.id))
                                            : destroy(route("admin.dashboard.movie.destroy", movie.id));
                                    }}
                                >
                                    <SecondaryButton type="button" variant="danger">
                                        {movie.deleted_at ? "Restore" : "Delete"}
                                    </SecondaryButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Authenticated>
    );
}
