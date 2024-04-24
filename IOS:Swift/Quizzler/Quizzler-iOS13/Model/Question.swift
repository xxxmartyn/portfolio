//
//  Question.swift
//  Quizzler-iOS13
//
//  Created by Bali Martin on 26/10/2023.
//  Copyright © 2023 The App Brewery. All rights reserved.
//

import Foundation

struct Question{
    let text : String
    let anwser : String
    
    init(q : String, a : String){
        text = q
        anwser = a
    }
}
