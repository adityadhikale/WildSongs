import { Subscription, User } from "@supabase/supabase-js";
import { UserDetails } from "../types.ts";
import { createContext, useEffect, useState } from "react";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import React, { useContext } from 'react';



type UserContentType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}

export const UserContext = createContext<UserContentType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
}


export const MyUserCotextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser()
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscritpion] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from('user').select('*').single();
    const getSubscription = () =>
        supabase
            .from("subscriptions")
            .select('*,prices(*,products(*))')
            .in('status', ['trialing', 'active'])
            .single();

    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoading(true);

            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                (result) => {
                    const userDetailsPromise = result[0];
                    const subscriptionPromise = result[1];

                    if (userDetailsPromise.status === 'fulfilled') {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }

                    if (subscriptionPromise.status === 'fulfilled') {
                        setSubscritpion(subscriptionPromise.value.data as Subscription);
                    }

                    setIsLoading(false);
                }
            );
        } else if(!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
            setSubscritpion(null);
        }
        // eslint-disable-next-line
    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading : isLoadingUser || isLoadingData,
        subscription
    }

    return <UserContext.Provider value={value} {...props} />

}

export const useUser = () =>{
    const context = useContext(UserContext);
    if(context === undefined){
        throw new Error('useUser must be used within the UserProvider');
    }

    return context;
}