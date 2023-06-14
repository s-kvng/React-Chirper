import React from "react";

//layouts
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

//components
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Chirp from "@/Components/Chirp";

//
import { useForm, Head } from "@inertiajs/react";

const Index = ({ auth, chirps }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("chirps.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Chirps" />

            <div className=" mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind ?"
                        className=" block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("message", e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Chirp
                    </PrimaryButton>
                </form>
                

                <div className="mt-10">
                    {chirps.map((chirp) => (
                       <>
                        <div className="mt-6 bg-white rounded-lg drop-shadow-md">
                         <Chirp key={chirp.id} chirp={chirp} />
                         
                       </div>
                       <hr className="border-t border-gray-300 my-6"/>

                       
                       </>
                       
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
